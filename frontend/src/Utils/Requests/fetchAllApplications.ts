import axios from "axios";
import { IApplication } from "../../Pages/Dashboard/Utils/Interfaces/IApplication";

/**
 * Fetal all applications in the database of a given user
 * @param userId the ID of the user
 * @returns the list of applications
 * @throws axios error
 */
export async function fetchAllApplicationsRequest(userId: string) {
    try {
        const res = await axios.post("http://localhost:4000/app/getAllUserApps", { userId });
        return res.data.applications;
    } catch (err) {
        throw err;
    }
}