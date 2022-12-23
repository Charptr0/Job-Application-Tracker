import axios from "axios";

interface RequestObject {
    username: string,
    email: string,
    password: string,
}

export async function registerUserRequest(reqObject: RequestObject) {
    try {
        const res = await axios.put("http://localhost:4000/user/insertUser", reqObject);
        return res;

    } catch (err) {
        throw err;
    }
}