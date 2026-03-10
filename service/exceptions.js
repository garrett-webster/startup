class UserAlreadyExistsException extends Error {
    constructor(message) {
        super(message);
        this.name = "UserAlreadyExistsError";
        this.statusCode = 409;
    }
}

class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

module.exports = { UserAlreadyExistsException, UnauthorizedException };