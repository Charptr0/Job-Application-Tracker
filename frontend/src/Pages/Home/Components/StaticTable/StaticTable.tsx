import { useState } from "react";
import styles from "./StaticTable.module.scss";
import { randomCompanyName } from "./Utils/randomCompanyName";
import { randomJobTitle } from "./Utils/randomJobTitle";
import { randomJobType } from "./Utils/randomJobType";
import { randomLocation } from "./Utils/randomLocation";
import { randomStatus } from "./Utils/randomStatus";

interface ISampleApplication {
    companyName: string;
    jobTitle: string;
    jobType: string;
    location: string;
    status: string;
}

export default function StaticTable() {
    const [sampleApplications, setSampleApplications] = useState<ISampleApplication[]>([]);

    function createApplicationHandler() {
        setSampleApplications(prev => [...prev, {
            companyName: randomCompanyName(),
            jobTitle: randomJobTitle(),
            jobType: randomJobType(),
            location: randomLocation(),
            status: randomStatus(),
        }])
    }

    return (
        <>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>Company Name</th>
                        <th>Job Title</th>
                        <th>Job Type</th>
                        <th>Location</th>
                        <th>Application Link</th>
                        <th>Status</th>
                    </tr>

                    {sampleApplications.map((app: ISampleApplication, i) => {
                        return <tr key={i}>
                            <td>{app.companyName}</td>
                            <td>{app.jobTitle}</td>
                            <td>{app.jobType}</td>
                            <td>{app.location}</td>
                            <td><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">Link</a></td>
                            <td>{app.status}</td>
                        </tr>
                    })}
                </tbody>
            </table>

            <div className={styles.btnContainer}>
                <button onClick={createApplicationHandler}>Create</button>
                <button onClick={() => setSampleApplications([])}>Reset</button>
            </div>
        </>
    )
}