import Application from "../Application/Application";
import styles from "./ApplicationList.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";

interface IProps {
    applications: IApplication[],
}

export default function ApplicationList(props: IProps) {

    async function openApplication(companyName: string) {
        console.log(companyName);
    }


    return <div className={styles.flexContainer}>
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