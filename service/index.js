const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
app.use(express.json());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

/* !!! Actual logic !!! */

let users = [];
let timeBoxListeners = [];
let usersListeners = [];

/* !!! Routes !!! */

apiRouter.post('/auth/create')

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});