import axios from "axios";


export async function authUserRequest(token: string) {
    try {
        const res = await axios.post("http://localhost:4000/user/auth", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return res.data;

    } catch (err) {
        throw err;
    }
}