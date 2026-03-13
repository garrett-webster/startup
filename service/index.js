const express = require('express');
const cookieParser = require('cookie-parser');
const {createUserHandler, loginUserHandler, getMeHandler, logoutUserHandler} = require("./authHandlers");
const {configureWebSocket} = require("./websocket");
const http = require('http');
const {updateEventInfoHandler, getEventInfoHandler} = require("./eventInfoHandlers");

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const server = http.createServer(app);

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

configureWebSocket(server);

const port = process.argv.length > 2 ? process.argv[2] : 4000;

apiRouter.get('/auth/me', getMeHandler)
apiRouter.post('/auth/create', createUserHandler);
apiRouter.post('/auth/login', loginUserHandler);
apiRouter.post('/auth/logout', logoutUserHandler);
apiRouter.get('/eventInfo', getEventInfoHandler);
apiRouter.post('/eventInfo', updateEventInfoHandler);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});