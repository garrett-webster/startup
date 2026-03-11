let socket;
let handlers = [];

export function connect() {
    socket = new WebSocket(`ws://${window.location.host}`);

    socket.onopen = () => {
        console.log("WebSocket connected");
    };

    socket.onclose = () => {
        console.log("WebSocket closed");
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        handlers.forEach(h => h(message));
    };
}

export function registerHandler(handler) {
    handlers.push(handler);
}

export function send(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
}