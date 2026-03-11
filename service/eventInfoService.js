const {validateToken} = require("./authService");

let eventInfo = {
    name: "Event Name",
    description: "Event Description",
    organizer: "Organizer Name",
    latitude: 0,
    longitude: 0
}

async function getEventInfo(token) {
    await validateToken(token);
    return eventInfo;
}

async function updateEventInfo(info, token) {
    await validateToken(token);
    eventInfo = { ...eventInfo, ...info };
}

module.exports = {
    getEventInfo,
    updateEventInfo
}