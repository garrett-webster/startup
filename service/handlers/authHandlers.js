const { createUser, loginUser, getMe, logoutUser} = require("../authService");


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
        const token = await loginUser(req.body.name, req.body.password);
        setAuthCookie(res, token);
        res.send({ user: req.body.name });
    } catch (e) {
        res.status(e.statusCode || 500).send({ msg: e.message });
    }
}

async function logoutUserHandler(req, res) {
    try {
        await logoutUser(req.cookies.token);
        res.clearCookie(authCookieName);
        res.send();
    } catch (e) {
        res.status(e.statusCode || 500).send({ msg: e.message });
    }
}

async function getMeHandler(req, res) {
    try {
        let userName = await getMe(req.cookies.token);
        res.status(200).send({ msg: userName})
    } catch {
        res.status(200).send({ msg: null})
    }
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        httpOnly: true,
        sameSite: 'strict',
    });
}

module.exports = {
    getMeHandler,
    loginUserHandler,
    logoutUserHandler,
    createUserHandler
};