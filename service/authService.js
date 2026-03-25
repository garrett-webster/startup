const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const {UserAlreadyExistsException, UnauthorizedException} = require("./exceptions");
const {getUser, insertUser, updateUser} = require("./database");

async function findUser(field, value) {
    if (!value) return null;

    return getUser(field, value);
}

async function saveUser(name, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        name: name,
        password: passwordHash,
        token: uuid.v4(),
    };
    await insertUser(user)
    return user;
}

async function createUser(name, password) {
    if (await findUser('name', name)) {
        throw new UserAlreadyExistsException("User already exists")
    }

    const user = await saveUser(name, password);
    return user.token;
}

async function loginUser(name, password) {
    const user = await getUser('name', name);
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            user.token = uuid.v4();
            await updateUser('name', name, { token: user.token });
            return user.token;
        }
    }

    throw new UnauthorizedException("Unauthorized");
}

async function logoutUser(token) {
    let user = await getUser("token", token)

    if (user) {
        await updateUser("token", token, { token: null });
    }
}

async function validateToken(token) {
    if (!token) throw new UnauthorizedException("Unauthorized");

    const user = await findUser("token", token);
    if (!user) throw new UnauthorizedException("Unauthorized");

    return user;
}

async function getMe(token) {
    if (!token) throw new UnauthorizedException("Unauthorized");

    const user = await findUser("token", token);
    if (!user) throw new UnauthorizedException("Unauthorized");

    return user.name;
}

module.exports = {
    validateToken,
    createUser,
    loginUser,
    logoutUser,
    getMe
};