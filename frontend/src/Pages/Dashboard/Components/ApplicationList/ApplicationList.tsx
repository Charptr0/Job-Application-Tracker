import Application from "../Application/Application";
import styles from "./ApplicationList.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";
import { useContext, useEffect, useRef, useState } from "react";
import JobDetails from "../JobDetails/JobDetails";
import { UserContext } from "../../../../Context/UserContext";
import { fetchAllApplicationsRequest } from "../../../../Utils/Requests/fetchAllApplications";
import { fetchAllCollectionsRequest } from "../../../../Utils/Requests/fetchAllCollections";
import { setCollection } from "../../../../Utils/Storage/setCollection";
import { getCollection } from "../../../../Utils/Storage/getCollection";


interface IJobDetails {
    visible: boolean,
    application: IApplication | null,
}

function filterApplicationByCollection(applications: IApplication[], collectionName: string) {
    return applications.filter(app => app.collectionName === collectionName);
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
    const collectionRef = useRef<HTMLSelectElement>(null);

    // filter
    const filterTypeRef = useRef<HTMLSelectElement>(null);
    const filterInputRef = useRef<HTMLInputElement>(null);
    const [currentFilterType, setCurrentFilterType] = useState("");

    // context
    const { currentUser } = useContext<any>(UserContext);

    const [showJobDetails, setShowJobDetails] = useState<IJobDetails>({
        visible: false,
        application: null
    });

    useEffect(() => {
        const fetchApplicationAndCollection = async () => {
            // get the current user id
            const userId = currentUser.id;
            try {
                // get all applications
                const resApplications = await fetchAllApplicationsRequest(userId);
                // all applications are stored
                setApplications(resApplications);

                // display ONLY applications with the correct collection
                const defaultCollection = getCollection() || "All";

                if (defaultCollection === "All") {
                    setFilteredApplications(resApplications);
                }

                else {
                    setFilteredApplications(filterApplicationByCollection(resApplications, defaultCollection));
                }

                // get all collections
                const resCollections = await fetchAllCollectionsRequest(userId);
                setCollections(resCollections);
                setCurrentCollection(defaultCollection);
                setCollection(defaultCollection);

                setLoading(false);

            } catch (err) {
                console.log(err);
            }
        }

        fetchApplicationAndCollection();
    }, [currentUser.id])

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
            setCollection(selectedCollection);
            return;
        }

        setCurrentCollection(selectedCollection);
        setCollection(selectedCollection);

        setFilteredApplications(applications.filter((app: IApplication) => app.collectionName === selectedCollection));
    }

    /**
     *  Update the current filter type
     */
    function filterTypeHandler() {
        const filterType = filterTypeRef.current?.value;
        const inputRef = filterInputRef.current;

        if (filterType === undefined || filterType === currentFilterType) return;
        if (!inputRef) return;

        setCurrentFilterType(filterType);

        inputRef.value = "";

        const appsBeforeFiltering = currentCollection === "All" ? applications : filterApplicationByCollection(applications, currentCollection);
        setFilteredApplications(appsBeforeFiltering);

        if (filterType === "No Filter") {
            inputRef.style.visibility = "hidden";
            return;
        }

        inputRef.style.visibility = "visible";
        // switch to date format if date submitted is chosen
        filterType.includes("Date") ? inputRef.type = "date" : inputRef.type = "text";

    }

    function filterInputOnChangeHandler() {
        const value = filterInputRef.current?.value;
        const filterType = filterTypeRef.current?.value;

        if (value === undefined) return;
        if (filterType === undefined) return;

        const appsBeforeFiltering = currentCollection === "All" ? applications : filterApplicationByCollection(applications, currentCollection);

        if (value === "" || filterType === "") {
            setFilteredApplications(appsBeforeFiltering);
            return;
        }

        setFilteredApplications(appsBeforeFiltering.filter(app => {
            switch (currentFilterType) {
                case "Company Name": return app.companyName.toLowerCase().includes(value);
                case "Job Title": return app.jobTitle.toLowerCase().includes(value);
                case "Location": return app.location.toLowerCase().includes(value);
                case "Job Type": return app.jobType.toLowerCase().includes(value);
                case "Status": return app.status.toLowerCase().includes(value);
                default: break;
            }

            // check if the filter option are dates
            if (currentFilterType.toLowerCase() === "date submitted (before)") {
                if (!app.dateSubmitted) return false;

                const appSubmittedDate = new Date(app.dateSubmitted);
                const filteredDate = new Date(value);

                return filteredDate >= appSubmittedDate;
            }

            else if (currentFilterType.toLowerCase() === "date submitted (after)") {
                if (!app.dateSubmitted) return false;

                const appSubmittedDate = new Date(app.dateSubmitted);
                const filteredDate = new Date(value);

                return filteredDate <= appSubmittedDate;
            }

            return false;
        }));
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div>
        <div>
            <div className={styles.title}>Switch Collection</div>
            <select onClick={switchCollectionHandler} ref={collectionRef} className={styles.switchCollection}>
                <option className={styles.switchCollectionOption}></option>
                <option className={styles.switchCollectionOption}>All</option>
                {collections.length > 0 && collections.map((collection, i) => <option key={i} className={styles.switchCollectionOption}>{collection}</option>)}
            </select>
        </div>
        <div className={styles.filterContainer}>
            <div className={styles.title}>Filter Result</div>
            <select ref={filterTypeRef} onClick={filterTypeHandler} className={styles.filterSelections}>
                <option className={styles.filterOptions}>No Filter</option>
                <option className={styles.filterOptions}>Company Name</option>
                <option className={styles.filterOptions}>Job Title</option>
                <option className={styles.filterOptions}>Location</option>
                <option className={styles.filterOptions}>Job Type</option>
                <option className={styles.filterOptions}>Status</option>
                <option className={styles.filterOptions}>Date Submitted (Before)</option>
                <option className={styles.filterOptions}>Date Submitted (After)</option>
            </select>
            <input ref={filterInputRef} onChange={filterInputOnChangeHandler} className={styles.filterInput} />
        </div>
        <div className={styles.title}>Current Collection: <span id="current-collection">{currentCollection}</span></div>
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
                        <th className={styles.jobType}>Job Type</th>
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