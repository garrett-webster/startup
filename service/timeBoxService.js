const { broadcast } = require('./websocket');

let timeBoxes = [];

function handleTimeBoxesMessage(message) {
    if (message.type === "timeboxes.new") {
        addTimebox(message.data)
    }
}

function addTimebox(box) {
    timeBoxes.push(box);

    broadcast({
        type: "timeboxes.updated",
        data: timeBoxes
    });
}
function getTimeBoxes() {
    return timeBoxes;
}

module.exports = {
    handleTimeBoxesMessage,
    getTimeBoxes
};