import { registerHandler } from "./websocket";
import { send } from "./websocket";

let timeBoxes = [];
let listeners = [];

export function subscribeTimeBoxes(callback) {
    listeners.push(callback);
    callback([...timeBoxes]);

    return () => {
        listeners = listeners.filter(l => l !== callback);
    };
}

function notify() {
    listeners.forEach(l => l([...timeBoxes]));
}

registerHandler((message) => {
    if (message.type === "timeboxesUpdated") {
        timeBoxes = message.data;
        notify();
    }
});

export function newTimebox(newBoxes) {
    send({
        type: "updateTimeboxes",
        data: newBoxes
    });
}