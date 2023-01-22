import axios from "axios";

export async function changeUsernameRequest(id: string, username: string, password: string) {
    try {
        await axios.post("http://localhost:4000/user/updateUserUsername", { id, username, password });
    } catch (err) {
        throw err;
    }
}