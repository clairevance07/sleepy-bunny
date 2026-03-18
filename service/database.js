const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('sleepybunny');

const userCollection = db.collection('user');
const friendCollection = db.collection('friend');
const logCollection = db.collection('log');
const notificationCollection = db.collection('notification');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

function addUser(user) {
    return userCollection.insertOne(user);
}

function updateToken(email, token) {
    return userCollection.updateOne({ email }, { $set: { token } });
}

async function getSleepData(email) {
    const user = await getUser(email);
    const logs = await logCollection.find({ email }).toArray();

    const logObject = {};
    logs.forEach(entry => { logObject[entry.date] = entry.hours; });

    return {
        logs: logObject,
        goal: user.goal || 8
    };
}

function updateSleepLog(email, date, hours) {
    return logCollection.updateOne(
        { email, date },
        { $set: { hours } },
        { upsert: true }
    );
}

function updateUserGoal(email, goal) {
    return userCollection.updateOne({ email }, { $set: { goal } });
}