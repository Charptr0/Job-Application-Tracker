import axios from "axios";

/**
 * Authorize the user 
 */
export async function authUserRequest(token: string) {
    try {
        const res = await axios.post("http://localhost:4000/auth/auth", {}, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        return res.data;

    } catch (err) {
        throw err;
    }
}