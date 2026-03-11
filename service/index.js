const express = require('express');
const cookieParser = require('cookie-parser');
const {createUserHandler, loginUserHandler} = require("./handlers/authHandlers");
const {configureWebSocket} = require("./websocket");
const http = require('http');

const app = express();
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

configureWebSocket(server);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

/* !!! Helper functions !!! */
const authCookieName = 'token';
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        httpOnly: true,
        sameSite: 'strict',
    });
}

apiRouter.post('/auth/create', createUserHandler);
apiRouter.post('/auth/login', loginUserHandler);
apiRouter.get('/eventInfo', getEventInfoHandler)
apiRouter.post('/eventInfo', updateEventInfoHandler)
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});