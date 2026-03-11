const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const {UserAlreadyExistsException, UnauthorizedException} = require("./exceptions");

let users = [];

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

async function saveUser(name, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        name: name,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    console.log(users);
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
    const user = await findUser('name', name);
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            user.token = uuid.v4();
            return user.token;
        }
    }

    throw new UnauthorizedException("Unauthorized");
}

async function validateToken(token) {
    if (!token) throw new UnauthorizedException("Unauthorized");

    const user = await findUser("token", token);
    if (!user) throw new UnauthorizedException("Unauthorized");

    return user;
}

module.exports = {
    validateToken,
    createUser,
    loginUser
};