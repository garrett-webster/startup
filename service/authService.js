const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const {UserAlreadyExistsException} = require("./exceptions");

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

module.exports = {
    createUser
};