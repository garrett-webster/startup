const { createUser, loginUser } = require("../authService");


const authCookieName = 'token';

async function createUserHandler(req, res) {
    try {
        setAuthCookie(res, await createUser(req.body.name, req.body.password));
        res.send();
    } catch (e) {
        console.log(e)
        res.status(e.statusCode || 500).send({ msg: e.message });
    }
}

async function loginUserHandler(req, res) {
    try {
        await loginUser(req.body.name, req.body.password);
        res.send();
    } catch (e) {
        res.status(e.statusCode || 500).send({ msg: e.message });
    }
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        httpOnly: true,
        sameSite: 'strict',
    });
}

module.exports = {
    loginUserHandler,
    createUserHandler
};