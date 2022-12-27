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
                <th className={styles.col1}>Company Name</th>
                <th className={styles.col2}>Job Title</th>
                <th className={styles.col3}>Location</th>
                <th className={styles.col4}>Application Link</th>
                <th className={styles.col5}>Status</th>
                <th className={styles.col6}>Notes</th>
            </tr>

            {props.applications.map((app: IApplication, i) => {
                return <Application application={app} key={i} />
            })}
        </table>
    </div>
}