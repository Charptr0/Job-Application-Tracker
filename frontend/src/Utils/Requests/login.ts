import axios from "axios";

interface RequestObject {
    email: string;
    password: string;
}

/**
 * Send login request to the backend
 */
export async function loginUserRequest(reqObject: RequestObject) {
    try {
        const res = await axios.post("http://localhost:4000/user/login", reqObject, { withCredentials: true });
        return res;

    } catch (err) {
        throw err;
    }
}