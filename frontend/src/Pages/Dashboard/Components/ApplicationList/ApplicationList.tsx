import Application from "../Application/Application";
import styles from "./ApplicationList.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";
import { useState } from "react";
import JobDetails from "../JobDetails/JobDetails";

interface IProps {
    applications: IApplication[],
}

interface IJobDetails {
    visible: boolean,
    application: IApplication | null,
}

export default function ApplicationList(props: IProps) {

    const [showJobDetails, setShowJobDetails] = useState<IJobDetails>({
        visible: false,
        application: null
    });

    async function openApplication(companyName: string) {
        setShowJobDetails({
            visible: true,
            application: props.applications.filter(app => app.companyName === companyName)[0]
        });
    }


    return <div className={styles.flexContainer}>
        {showJobDetails.visible && showJobDetails.application && <JobDetails application={showJobDetails.application} setVisible={setShowJobDetails} />}
        <table className={styles.table}>
            <tbody>
                <tr>
                    <th className={styles.companyName}>Company Name</th>
                    <th className={styles.jobTitle}>Job Title</th>
                    <th className={styles.jobTitle}>Job Type</th>
                    <th className={styles.location}>Location</th>
                    <th className={styles.appLink}>Application Link</th>
                    <th className={styles.status}>Status</th>
                </tr>

                {props.applications.map((app: IApplication, i) => {
                    return <Application application={app} key={i} onClick={() => openApplication(app.companyName)} />
                })}
            </tbody>
        </table>
    </div>
}