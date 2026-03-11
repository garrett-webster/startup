let timeBoxes = [];

function handleTimeBoxesMessage(message, broadcast) {
    if (message.type === "timeboxes.new") {
        addTimebox(message.data, broadcast)
    }

    if (message.type === "timeboxes.vote") {
        const { id, type, user } = message.data;
        handleVote(id, type, user, broadcast);
    }
}

function addTimebox(box, broadcast) {
    timeBoxes.push(box);
    updateTimeBoxes(broadcast);
}

function updateTimeBoxes(broadcast) {
    broadcast({
        type: "timeboxes.updated",
        data: timeBoxes
    });
}

function getTimeBoxes() {
    return timeBoxes;
}

function handleVote(id, type, user, broadcast) {
    timeBoxes = timeBoxes.map(box => {
        if (box.id !== id) return box;

        let yesVotes = box.yesVotes.filter(u => u !== user);
        let noVotes  = box.noVotes.filter(u => u !== user);

        if (type === "yes" && !box.yesVotes.includes(user)) {
            yesVotes.push(user);
        }

        if (type === "no" && !box.noVotes.includes(user)) {
            noVotes.push(user);
        }

        return { ...box, yesVotes, noVotes };
    });

    updateTimeBoxes(broadcast);
}

module.exports = {
    handleTimeBoxesMessage,
    getTimeBoxes
};