const WebSocket = require('ws');

let clients = [];

function configureWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        clients.push(ws);

        ws.on('message', (data) => {
            const message = JSON.parse(data);

            if (message.type === "updateTimeboxes") {
                broadcast({
                    type: "timeboxesUpdated",
                    data: message.data
                });
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