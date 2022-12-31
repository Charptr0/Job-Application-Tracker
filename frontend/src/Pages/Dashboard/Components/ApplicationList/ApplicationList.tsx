import Application from "../Application/Application";
import styles from "./ApplicationList.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";
import { useContext, useEffect, useState } from "react";
import JobDetails from "../JobDetails/JobDetails";
import { UserContext } from "../../../../Context/UserContext";
import { fetchAllApplicationsRequest } from "../../../../Utils/Requests/fetchAllApplications";


interface IJobDetails {
    visible: boolean,
    application: IApplication | null,
}

export default function ApplicationList() {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, updateUser } = useContext<any>(UserContext);

    useEffect(() => {
        const fetchApplication = async () => {
            // get the current user id
            const userId = currentUser.id;
            try {
                const applications = await fetchAllApplicationsRequest(userId);
                setApplications(applications);
                setLoading(false);

            } catch (err) {
                console.log(err);
            }
        }

        fetchApplication();
    }, [currentUser.id])

    const [showJobDetails, setShowJobDetails] = useState<IJobDetails>({
        visible: false,
        application: null
    });

    async function openApplication(applicationId: string) {
        setShowJobDetails({
            visible: true,
            application: applications.filter(app => app._id === applicationId)[0]
        });
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div className={styles.flexContainer}>
        {showJobDetails.visible && showJobDetails.application &&
            <JobDetails
                currentApplication={showJobDetails.application}
                setApplicationDetails={setShowJobDetails}
            />}
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

                {applications.length > 0 && applications.map((app: IApplication, i) => {
                    return <Application application={app} key={i} onClick={() => openApplication(app._id || "")} />
                })}
            </tbody>
        </table>
    </div>
}