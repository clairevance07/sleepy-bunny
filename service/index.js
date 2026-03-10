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

const friendsPerUser = {
  XYZ: []
};

const notificationsPerUser = {
    XYZ: []
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.send({ msg: "Hello from the backend!" });
});

app.get('/api/friends/:code', (req, res) => {
  const userCode = req.params.code.toUpperCase();
  const friends = friendsPerUser[userCode] || [];
  res.send(friends);
});

app.post('/api/friends/:code/add', (req, res) => {
  const userCode = req.params.code.toUpperCase();
  const friendCode = req.body.friendCode.toUpperCase();

  if (!users[friendCode]) return res.status(404).send({ msg: "Invalid friend code" });

  if (!friendsPerUser[userCode]) friendsPerUser[userCode] = [];

  if (friendsPerUser[userCode].some(f => f.code === friendCode)) {
    return res.status(400).send({ msg: "Already friends" });
  }

  const friendData = users[friendCode];
  friendsPerUser[userCode].push({
    code: friendCode,
    name: friendData.name,
    streak: friendData.streak,
    sleep: friendData.sleep
  });

  res.send({ success: true });
});

app.post('/api/notifications/:code', (req, res) => {
    const userCode = req.params.code.toUpperCase();
    const { text } = req.body;

    if (!notificationsPerUser[userCode]) notificationsPerUser[userCode] = [];

    const id = Date.now();
    notificationsPerUser[userCode].unshift({ id, text });

    notificationsPerUser[userCode] = notificationsPerUser[userCode].slice(0, 10);

    res.send({ success: true, id });
});

app.get('/api/notifications/:code', (req, res) => {
  const userCode = req.params.code.toUpperCase();
  res.send(notificationsPerUser[userCode] || []);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});