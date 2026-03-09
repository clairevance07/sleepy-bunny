const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const users = {
        "ABC": { name: "Kaitlyn", streak: 5, sleep: "7.5h" },
        "DEF": { name: "Hallie", streak: 12, sleep: "8.2h" },
        "GHI": { name: "Maddie", streak: 3, sleep: "6.0h" },
        "JKL": { name: "Katelyn", streak: 8, sleep: "7.0h" },
        "MNO": { name: "Beyonce", streak: 100, sleep: "9.0h" },
        "PQR": { name: "Chase", streak: 1, sleep: "5.5h" },
        "STU": { name: "Mason", streak: 0, sleep: "7.8h" }
    };

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.send({ msg: "Hello from the backend!" });
});

app.get('/api/users/:code', (req, res) => {
  const user = users[req.params.code.toUpperCase()];

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ msg: "Invalid code" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});