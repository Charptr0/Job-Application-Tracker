import { randomCompanyName } from "./randomCompanyName";
import { randomJobTitle } from "./randomJobTitle";
import { randomJobType } from "./randomJobType";
import { randomLocation } from "./randomLocation";
import { randomStatus } from "./randomStatus";

export function randomJobApplication() {
    return {
        companyName: randomCompanyName(),
        jobTitle: randomJobTitle(),
        jobType: randomJobType(),
        location: randomLocation(),
        status: randomStatus(),
    }
}