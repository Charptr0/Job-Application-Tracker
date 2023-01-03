import axios from "axios";

export async function fetchAllCollectionsRequest(userId: string) {
    try {
        const res = await axios.post("http://localhost:4000/app/getAllUserCollections", { userId });
        return res.data.collections;
    } catch (err) {
        throw err;
    }
}