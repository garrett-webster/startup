const { getEventInfo, updateEventInfo} = require("../eventInfoService");


async function getEventInfoHandler(req, res) {
    try {
        const token = req.cookies['token'];
        res.status(200).json(await getEventInfo(token));
    } catch (e) {
        console.log(e)
        res.status(e.statusCode || 500).send({ msg: e.message });
    }
}

async function updateEventInfoHandler(req, res) {
    try {
        const token = req.cookies['token'];
        await updateEventInfo(req.body.eventInfo, token)
        res.status(200).send({ success: true });
    } catch (e) {
        console.log(e)
        res.status(e.statusCode || 500).send({ msg: e.message });
    }
}

// TODO: Add a clear data endpoint

module.exports = {
    getEventInfoHandler,
    updateEventInfoHandler
}