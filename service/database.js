const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('whenify');
const userCollection = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(field, value) {
    return userCollection.findOne({ [field]: value })
}

async function insertUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(field, value, user) {
    await userCollection.updateOne({ [field]: value}, { $set: user})
}

module.exports = {
    getUser,
    insertUser,
    updateUser
}