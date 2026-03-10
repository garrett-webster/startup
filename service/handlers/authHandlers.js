import {createUser} from "../authService";

export async function createUserHandler(req, res) {
    try {
        await createUser(req.body.name, req.body.password);
        res.send();
    } catch (e) {
        res.status(e.statusCode || 500).send({ msg: e.message });
    }
}