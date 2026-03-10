const express = require('express');
const cookieParser = require('cookie-parser');
const {findUser, createUser} = require("./authService");

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

/* !!! Routes !!! */

apiRouter.post('/auth/create')

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('name', req.body.name)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.name });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});