const {insertTimeBox, getAllTimeBoxes, setTimeBox} = require("./database");

async function handleTimeBoxesMessage(message, broadcast) {
    if (message.type === "timeboxes.new") {
        await addTimebox(message.data, broadcast)
    }

    if (message.type === "timeboxes.vote") {
        const { id, type, user } = message.data;
        await handleVote(id, type, user, broadcast);
    }
}

async function addTimebox(box, broadcast) {
    await insertTimeBox(box);
    await updateTimeBoxes(broadcast);
}

async function updateTimeBoxes(broadcast) {
    broadcast({
        type: "timeboxes.updated",
        data: await getAllTimeBoxes()
    });
}

async function handleVote(id, type, user, broadcast) {
    const boxes = await getAllTimeBoxes();
    for (const box of boxes) {
        if (box.id !== id) continue;

        let yesVotes = box.yesVotes.filter(u => u !== user);
        let noVotes  = box.noVotes.filter(u => u !== user);

        if (type === "yes" && !box.yesVotes.includes(user)) yesVotes.push(user);
        if (type === "no" && !box.noVotes.includes(user)) noVotes.push(user);

        await setTimeBox(box.id, { ...box, yesVotes, noVotes });
    }
    await updateTimeBoxes(broadcast);
}

module.exports = {
    handleTimeBoxesMessage
};