import axios from "axios";

export async function changeEmailRequest(id: string, email: string, password: string) {
    try {
        await axios.post("http://localhost:4000/user/updateUserEmail", { id, email, password });
    } catch (err) {
        throw err;
    }
}