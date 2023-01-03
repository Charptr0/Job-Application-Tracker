import Application from "../Application/Application";
import styles from "./ApplicationList.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";
import { useContext, useEffect, useRef, useState } from "react";
import JobDetails from "../JobDetails/JobDetails";
import { UserContext } from "../../../../Context/UserContext";
import { fetchAllApplicationsRequest } from "../../../../Utils/Requests/fetchAllApplications";
import { fetchAllCollectionsRequest } from "../../../../Utils/Requests/fetchAllCollections";


interface IJobDetails {
    visible: boolean,
    application: IApplication | null,
}

export default function ApplicationList() {
    // applications states
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [filteredApplications, setFilteredApplications] = useState<IApplication[]>([]);

    // loading states
    const [loading, setLoading] = useState(true);

    // collection states
    const [currentCollection, setCurrentCollection] = useState("All");
    const [collections, setCollections] = useState<string[]>([]);

    // context
    const { currentUser, updateUser } = useContext<any>(UserContext);

    const collectionRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const fetchApplication = async () => {
            // get the current user id
            const userId = currentUser.id;
            try {
                const resApplications = await fetchAllApplicationsRequest(userId);
                // all applications are stored
                setApplications(resApplications);

                // display ONLY applications with the correct collection
                const defaultCollection = localStorage.getItem('collection') || "All";

                if (defaultCollection === "All") {
                    setFilteredApplications(resApplications);
                }

                else {
                    setFilteredApplications(resApplications.filter((app: IApplication) => app.collectionName === defaultCollection));
                }

                const resCollections = await fetchAllCollectionsRequest(userId);
                setCollections(resCollections);

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

    /**
     * Switch between different collections
     */
    function switchCollectionHandler() {
        const selectedCollection = collectionRef.current?.value;

        if (!selectedCollection || selectedCollection === currentCollection) return;

        if (selectedCollection === 'All') {
            setFilteredApplications(applications);
            setCurrentCollection("All");
            return;
        }

        setCurrentCollection(selectedCollection);
        setFilteredApplications(applications.filter((app: IApplication) => app.collectionName === selectedCollection));
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div>
        <div>
            <h2>Switch Collection</h2>
            <select onClick={switchCollectionHandler} ref={collectionRef}>
                <option>All</option>
                {collections.length > 0 && collections.map(collection => <option>{collection}</option>)}
            </select>
        </div>
        <h2>Current Collection: {currentCollection}</h2>
        {showJobDetails.visible && showJobDetails.application &&
            <JobDetails
                currentApplication={showJobDetails.application}
                setApplicationDetails={setShowJobDetails}
            />
        }
        <div className={styles.flexContainer}>
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

                    {filteredApplications.length > 0 && filteredApplications.map((app: IApplication) => {
                        return <Application application={app} key={app._id} onClick={() => openApplication(app._id || "")} />
                    })}
                </tbody>
            </table>
        </div>
    </div>
}