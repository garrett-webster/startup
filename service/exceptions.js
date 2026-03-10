export class UserAlreadyExistsException extends Error {
    constructor(message) {
        super(message);
        this.name = "UserAlreadyExistsError";
        this.statusCode = 409;
    }
}

module.exports = { UserAlreadyExistsException };