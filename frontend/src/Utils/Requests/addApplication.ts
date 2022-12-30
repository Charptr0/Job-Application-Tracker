import axios from "axios";
import { IApplication } from "../../Pages/Dashboard/Utils/Interfaces/IApplication";

export async function addApplicationRequest(userId: string, collectionName: string, applicationObj: IApplication) {
    try {
        await axios.post("http://localhost:4000/app/addApp", {
            userId,
            collectionName,
            application: applicationObj
        })
    } catch (err) {
        throw err;
    }
}