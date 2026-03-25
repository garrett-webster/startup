const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);


let db;
let userCollection;
let eventInfoCollection;
let timeBoxCollection;

(async function initialize() {
    try {
        await client.connect();
        db = client.db('whenify');
        userCollection = db.collection('user');
        eventInfoCollection = db.collection('eventInfo');
        timeBoxCollection = db.collection('timeBox');
        await db.command({ ping: 1 });
        console.log('Connected to database');

        const existing = await eventInfoCollection.findOne({});
        if (!existing) {
            await eventInfoCollection.insertOne({
                    name: "Event Name",
                    description: "Event Description",
                    organizer: "Organizer Name",
                    latitude: 40.233845,
                    longitude: -111.658531
                }
            );
            console.log('Seeded eventInfo');
        }
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

async function fetchEventInfo() {
    return eventInfoCollection.findOne({});
}

async function setEventInfo(info) {
    await eventInfoCollection.replaceOne({}, info, { upsert: true });
}

async function getAllTimeBoxes() {
    return timeBoxCollection.find({}).toArray();
}

async function setTimeBox(id, box) {
    await timeBoxCollection.updateOne({ id : id}, { $set: box})
}

async function insertTimeBox(box) {
    await timeBoxCollection.insertOne(box);
}

module.exports = {
    getUser,
    insertUser,
    updateUser,
    fetchEventInfo,
    setEventInfo,
    getAllTimeBoxes,
    insertTimeBox,
    setTimeBox
}