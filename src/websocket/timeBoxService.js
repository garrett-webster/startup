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
    if (message.type === "timeboxes.updated") {
        timeBoxes = message.data;
        notify();
    }
});

export function newTimebox(newBox) {
    send({
        type: "timeboxes.new",
        data: newBox
    });
}