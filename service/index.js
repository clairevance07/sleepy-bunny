const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const DB = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const verifyAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ msg: "Unauthorized" });
  
  const user = await DB.getUserByToken(token);
  if (!user) return res.status(401).send({ msg: "Unauthorized" });

  req.user = user;
  next();
};

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.post('/api/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.includes('@')) return res.status(400).send({ msg: "Invalid email address" });

  if (await DB.getUser(email)) return res.status(409).send({ msg: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const token = uuidv4();

   await DB.addUser({
    email: email,
    password: passwordHash,
    token: token,
    goal: 8,
    streak: 0
  });

  res.cookie('token', token, { httpOnly: true, sameSite: 'strict', path: '/'});
  res.send({ email });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await DB.getUser(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ msg: "Invalid email or password" });
  }
  const token = uuidv4();
  await DB.updateToken(email, token);

  res.cookie('token', token, { httpOnly: true, sameSite: 'strict', path: '/' });
  res.send({ email });
});

app.delete('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.send({ success: true });
});

app.get('/api/friends', verifyAuth, async (req, res) => {
  const friends = await DB.getFriends(req.user.email);
  res.send(friends);
});

app.post('/api/friends/add', verifyAuth, async (req, res) => {
  const email = req.user.email;
  const friendEmail = req.body.email;

  if (friendEmail === email) return res.status(404).send({ msg: "User not found" });

  const friendUser = await DB.getUser(friendEmail);
  if (!friendUser) return res.status(404).send({ msg: "User not found" });

  const friends = await DB.getFriends(email);
  if (friends.some(f => f.email === friendEmail)) {
    return res.status(400).send({ msg: "Already friends" });
  }

  await DB.addFriend(email, friendEmail);
  res.send({ success: true });
});

app.delete('/api/friends/remove/:email', verifyAuth, async (req, res) => {
  await DB.removeFriend(req.user.email, req.params.email);
  res.send({ success: true })
});

app.post('/api/notifications', verifyAuth, async (req, res) => {
    const { text } = req.body;
    try {
      await DB.addNotification(req.user.email, text);
      res.send({ success: true });
    } catch (err) {
      res.status(500).send({ msg: "Failed to save notification" })
    }
});

app.get('/api/notifications', verifyAuth, async (req, res) => {
  try {
    const notes = await DB.getNotifications(req.user.email);
    res.send(notes);
  } catch (err) {
    res.status(500).send({ msg: "Failed to fetch notifications"});
  }
});

app.get('/api/sleep', verifyAuth, async (req, res) => {
  const data = await DB.getSleepData(req.user.email);
  res.send(data);
});

app.post('/api/sleep', verifyAuth, async (req, res) => {
  const { date, hours, streak } = req.body;

  if (!date || hours === undefined || hours < 0 || hours > 24) {
    return res.status(400).send({ msg: "Invalid data" });
  }

  await DB.updateSleepLog(req.user.email, date, hours)

  if (streak !== undefined) {
      await DB.updateUserStreak(req.user.email, streak);
    }

  res.send({ success: true });
})

app.post('/api/goal', verifyAuth, async (req, res) => {
  const { goal } = req.body;

  if (goal === undefined || goal < 0 || goal > 24) {
    return res.status(400).send({ msg: "Invalid goal" });
  }

  await DB.updateUserGoal(req.user.email, goal);
  res.send({ success: true, goal });
})

app.get('/api/user/me', verifyAuth, (req, res) => {
  res.send({ userName: req.user.email });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});