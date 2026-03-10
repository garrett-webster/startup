const express = require('express');
const cookieParser = require('cookie-parser');
const {createUserHandler, loginUserHandler} = require("./handlers/authHandlers");

const app = express();
app.use(express.json());
app.use(cookieParser());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

/* !!! Helper functions !!! */
const authCookieName = 'token';
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        httpOnly: true,
        sameSite: 'strict',
    });
}

let timeBoxListeners = [];
let usersListeners = [];

apiRouter.post('/auth/create', createUserHandler);
apiRouter.post('/auth/login', loginUserHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});