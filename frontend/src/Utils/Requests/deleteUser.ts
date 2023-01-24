import axios from "axios";

export async function deleteUserRequest(id: string, password: string) {
    try {
        await axios.post("http://localhost:4000/user/deleteUserById", { id, password });
    } catch (err) {
        throw err;
    }
}