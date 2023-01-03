import axios from "axios";

export async function addCollectionRequest(userId: string, collectionName: string) {
    try {
        await axios.post("http://localhost:4000/app/addCollection", { userId, collectionName });
    } catch (err) {
        throw err;
    }
}