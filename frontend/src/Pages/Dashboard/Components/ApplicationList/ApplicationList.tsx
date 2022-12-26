import Application from "../Application/Application";
import styles from "./ApplicationList.module.scss";

interface IApplication {
    companyName: string,
    jobTitle: string,
    appLink: string,
    location: string,
    status: string,
    notes?: string,
}

interface IProps {
    applications: IApplication[],
}

export default function ApplicationList(props: IProps) {
    return <div className={styles.flexContainer}>
        <table className={styles.table}>
            <tr>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Application Link</th>
                <th>Status</th>
                <th>Notes</th>
            </tr>

            {props.applications.map((app: IApplication, i) => {
                return <Application application={app} key={i} />
            })}
        </table>
    </div>
}