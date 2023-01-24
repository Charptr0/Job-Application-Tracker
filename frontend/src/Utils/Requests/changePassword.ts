import axios from "axios";

export async function changePasswordRequest(id: string, newPassword: string, currentPassword: string) {
    try {
        await axios.post("http://localhost:4000/user/updateUserPassword", { id, newPassword, reqPassword: currentPassword });
    } catch (err) {
        throw err;
    }
}