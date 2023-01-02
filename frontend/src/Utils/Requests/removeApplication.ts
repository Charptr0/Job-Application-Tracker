import axios from "axios";

export async function removeApplicationRequest(userId: string, applicationId: string) {
    try {
        await axios.post("http://localhost:4000/app/deleteApp", { userId, applicationId });
    } catch (err) {
        throw err;
    }
}