const WebSocket = require('ws');
const {handleTimeBoxesMessage, getTimeBoxes} = require("./timeBoxService");

let clients = [];

function configureWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        clients.push(ws);
        ws.send(JSON.stringify({
            type: "timeboxes.updated",
            data: getTimeBoxes()
        }));

        ws.on('message', (data) => {
            const message = JSON.parse(data);

            if (message.type.startsWith("timeboxes")) {
                handleTimeBoxesMessage(message, broadcast);
            }
        });

        ws.on('close', () => {
            clients = clients.filter(c => c !== ws);
        });
    });
}

function broadcast(message) {
    const data = JSON.stringify(message);

    clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
        }
    });
}

module.exports = { configureWebSocket, broadcast };