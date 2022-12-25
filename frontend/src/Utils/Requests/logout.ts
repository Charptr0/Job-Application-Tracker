import axios from "axios";


export async function logoutRequest() {
    try {
        await axios.post("http://localhost:4000/auth/logout", {}, {
            withCredentials: true,
        });
    } catch (err) {
        throw err;
    }
}