let timeBoxes = [];

function handleTimeBoxesMessage(message, broadcast) {
    if (message.type === "timeboxes.new") {
        addTimebox(message.data, broadcast)
    }
}

function addTimebox(box, broadcast) {
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