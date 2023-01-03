import axios from "axios";

export async function removeCollectionRequest(userId: string, collectionName: string) {
    try {
        await axios.post("http://localhost:4000/app/deleteCollection", { userId, collectionName });
    } catch (err) {
        throw err;
    }
}