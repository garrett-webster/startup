const {validateToken} = require("./authService");

let eventInfo = {
    name: "Event Name",
    description: "Event Description",
    organizer: "Organizer Name",
    latitude: 40.233845,
    longitude: -111.658531
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