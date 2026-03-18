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
  if (!user) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  req.user = user;
  next();
};

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.post('/api/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).send({ msg: "Invalid email address" });
  }

  if (await DB.getUser(email)) {
    return res.status(409).send({ msg: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const token = uuidv4();

   await DB.addUser({
    email: email,
    password: passwordHash,
    token: token,
    goal: 8
  });

  res.cookie('token', authUsers[email].token, { httpOnly: true, sameSite: 'strict', path: '/'});
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

app.post('/api/notifications', verifyAuth, (req, res) => {
    const email = req.user.email;
    const { text } = req.body;

    if (!notificationsPerUser[email]) notificationsPerUser[email] = [];

    const id = Date.now();
    notificationsPerUser[email].unshift({ id, text });

    notificationsPerUser[email] = notificationsPerUser[email].slice(0, 10);

    res.send({ success: true, id });
});

app.delete('/api/friends/remove/:email', verifyAuth, (req, res) => {
  const email = req.user.email;
  const friendEmail = req.params.email;

  if (!friendsPerUser[email]) return res.status(404).send({ msg: "User not found" });

  friendsPerUser[email] = friendsPerUser[email].filter(f => f.email !== friendEmail);

  res.send({ success: true });
});

app.get('/api/notifications', verifyAuth, (req, res) => {
  const email = req.user.email;
  if (!notificationsPerUser[email]) notificationsPerUser[email] = [];
  res.send(notificationsPerUser[email]);
});

app.get('/api/sleep', verifyAuth, (req, res) => {
  const email = req.user.email;

  if(!sleepLogsPerUser[email]) sleepLogsPerUser[email] = {};
  if (goalPerUser[email] === undefined) {
    goalPerUser[email] = 8;
  }

  res.send({
    logs: sleepLogsPerUser[email],
    goal: goalPerUser[email]
  });
});

app.post('/api/sleep', verifyAuth, (req, res) => {
  const email = req.user.email;
  const { date, hours } = req.body;

  if (!date || hours === undefined) {
    return res.status(400).send({ msg: "Missing data" });
  }

  if (hours < 0 || hours > 24) {
    return res.status(400).send({ msg: "Hours must be between 0 and 24" });
  }

  if (!sleepLogsPerUser[email]) sleepLogsPerUser[email] = {};

  sleepLogsPerUser[email][date] = hours;

  res.send({ success: true });
})

app.post('/api/goal', verifyAuth, (req, res) => {
  const email = req.user.email;
  const { goal } = req.body;

  if (goal === undefined) {
    return res.status(400).send({ msg: "Missing goal" });
  }

  if (goal < 0 || goal > 24) {
    return res.status(400).send({ msg: "Goal must be between 0 and 24 hours" });
  }

  goalPerUser[email] = goal;

  res.send({ success: true, goal });
})

app.get('/api/user/me', verifyAuth, (req, res) => {
  res.send({ userName: req.user.email });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});