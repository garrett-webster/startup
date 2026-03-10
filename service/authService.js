const uuid = require('uuid');
const bcrypt = require('bcryptjs');

let users = [];

export async function findUser(field, value, users) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

export async function createUser(name, password, users) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        name: name,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}