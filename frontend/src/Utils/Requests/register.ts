import axios from "axios";

interface RequestObject {
    username: string,
    email: string,
    password: string,
}

/**
 * Send a request to the backend to create a new user  
 */
export async function registerUserRequest(reqObject: RequestObject) {
    try {
        const res = await axios.put("http://localhost:4000/user/insertUser", reqObject);
        return res;

    } catch (err) {
        throw err;
    }
}