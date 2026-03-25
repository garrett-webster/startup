const {validateToken} = require("./authService");
const {fetchEventInfo, setEventInfo} = require("./database");

async function getEventInfo(token) {
    await validateToken(token);
    return fetchEventInfo();
}

async function updateEventInfo(info, token) {
    await validateToken(token);
    const eventInfo = await fetchEventInfo(); // fetch first
    await setEventInfo({ ...eventInfo, ...info });
}

module.exports = {
    getEventInfo,
    updateEventInfo
}