const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const users = {
        "XYZ": { name: "You", streak: 5, sleep: "7.0h" },
        "ABC": { name: "Kaitlyn", streak: 5, sleep: "7.5h" },
        "DEF": { name: "Hallie", streak: 12, sleep: "8.2h" },
        "GHI": { name: "Maddie", streak: 3, sleep: "6.0h" },
        "JKL": { name: "Katelyn", streak: 8, sleep: "7.0h" },
        "MNO": { name: "Beyonce", streak: 100, sleep: "9.0h" },
        "PQR": { name: "Chase", streak: 1, sleep: "5.5h" },
        "STU": { name: "Mason", streak: 0, sleep: "7.8h" }
    };

const authUsers = {};

const friendsPerUser = {
  XYZ: []
};

const notificationsPerUser = {
    XYZ: []
}

const verifyAuth = (req, res, next) => {
  const token = req.cookies.token;
  const user = Object.values(authUsers).find(u => u.token === token);
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

  if (authUsers[email]) {
    return res.status(409).send({ msg: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  authUsers[email] = {
    email: email,
    password: passwordHash,
    token: uuidv4()
  };

  res.cookie('token', authUsers[email].token, { httpOnly: true, secure: true });

  res.send({ email });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = authUsers[email];
  if (!user) {
    return res.status(401).send({ msg: "Unknown user" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).send({ msg: "Incorrect password" });
  }

  user.token = uuidv4();

  res.cookie('token', user.token, { httpOnly: true });

  res.send({ email });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.send({ success: true });
});

app.get('/api/friends', verifyAuth, (req, res) => {
  const email = req.user.email;
  if (!friendsPerUser[email]) friendsPerUser[email] = [];
  res.send(friendsPerUser[email]);
});

app.post('/api/friends/add', verifyAuth, (req, res) => {
  const email = req.user.email;
  const friendCode = req.body.friendCode.toUpperCase();

  if (!users[friendCode]) return res.status(404).send({ msg: "Invalid friend code" });

  if (!friendsPerUser[email]) friendsPerUser[email] = [];

  if (friendsPerUser[email].some(f => f.code === friendCode)) {
    return res.status(400).send({ msg: "Already friends" });
  }

  const friendData = users[friendCode];
  friendsPerUser[email].push({
    code: friendCode,
    name: friendData.name,
    streak: friendData.streak,
    sleep: friendData.sleep
  });

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

app.delete('/api/friends/remove/:friendCode', verifyAuth, (req, res) => {
  const email = req.user.email;
  const friendCode = req.params.friendCode.toUpperCase();

  if (!friendsPerUser[email]) return res.status(404).send({ msg: "User not found" });

  friendsPerUser[email] = friendsPerUser[email].filter(f => f.code !== friendCode);

  res.send({ success: true });
});

app.get('/api/notifications', verifyAuth, (req, res) => {
  const email = req.user.email;
  if (!notificationsPerUser[email]) notificationsPerUser[email] = [];
  res.send(notificationsPerUser[email]);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});