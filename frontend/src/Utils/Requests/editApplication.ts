import axios from "axios";
import { IApplication } from "../../Pages/Dashboard/Utils/Interfaces/IApplication";

export async function editApplicationRequest(userId: string, collectionName: string, newApplication: IApplication) {
    try {
        await axios.post("http://localhost:4000/app/editApp", { userId, collectionName, application: newApplication });
    } catch (err) {
        throw err;
    }
}