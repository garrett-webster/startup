const WebSocket = require('ws');
const {handleTimeBoxesMessage } = require("./timeBoxService");
const {getAllTimeBoxes} = require("./database");

let clients = [];

function configureWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', async (ws) => {
        clients.push(ws);
        ws.send(JSON.stringify({
            type: "timeboxes.updated",
            data: await getAllTimeBoxes ()
        }));

        ws.on('message', async (data) => {
            const message = JSON.parse(data);

            if (message.type.startsWith("timeboxes")) {
                await handleTimeBoxesMessage(message, broadcast);
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