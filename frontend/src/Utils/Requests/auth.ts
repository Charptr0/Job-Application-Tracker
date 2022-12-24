import axios from "axios";


export async function authUserRequest(user: any, token: string) {
    try {
        const res = await axios.post("http://localhost:4000/auth/auth", { user }, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        return res.data;

    } catch (err) {
        throw err;
    }
}