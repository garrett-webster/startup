const uuid = require('uuid');
const bcrypt = require('bcryptjs');

let users = [];

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

async function createUser(name, password) {
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

module.exports = {
    findUser,
    createUser
};