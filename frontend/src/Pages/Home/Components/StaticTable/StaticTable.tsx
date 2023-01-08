import { useState } from "react";
import { randomJobApplication } from "../../Utils/randomJobApplication";
import styles from "./StaticTable.module.scss";
import tableStyles from "../tableStyles.module.scss";


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
        setSampleApplications(prev => [...prev, randomJobApplication()])
    }

    return (
        <>
            <table className={tableStyles.table}>
                <tbody>
                    <tr>
                        <th className={tableStyles.col1}>Company Name</th>
                        <th className={tableStyles.col2}>Job Title</th>
                        <th className={tableStyles.col3}>Job Type</th>
                        <th className={tableStyles.col4}>Location</th>
                        <th className={tableStyles.col5}>Application Link</th>
                        <th className={tableStyles.col6}>Status</th>
                    </tr>

                    {sampleApplications.map((app: ISampleApplication, i) => {
                        return <tr key={i}>
                            <td className={tableStyles.col1}>{app.companyName}</td>
                            <td className={tableStyles.col2}>{app.jobTitle}</td>
                            <td className={tableStyles.col3}>{app.jobType}</td>
                            <td className={tableStyles.col4}>{app.location}</td>
                            <td className={tableStyles.col5}><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">Link</a></td>
                            <td className={tableStyles.col6}>{app.status}</td>
                        </tr>
                    })}
                </tbody>
            </table>

            <div className={tableStyles.btnContainer}>
                <button onClick={createApplicationHandler}>Create</button>
                <button onClick={() => setSampleApplications([])}>Reset</button>
            </div>
        </>
    )
}