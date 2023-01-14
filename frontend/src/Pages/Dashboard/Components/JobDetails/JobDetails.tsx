import modalStyles from "../../Utils/Styles/modal.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";
import { useContext, useRef, useState } from "react";
import { removeApplicationRequest } from "../../../../Utils/Requests/removeApplication";
import { UserContext } from "../../../../Context/UserContext";
import { editApplicationRequest } from "../../../../Utils/Requests/editApplication";
import styles from "./JobDetails.module.scss";

interface IProps {
    currentApplication: IApplication,
    setApplicationDetails: Function,
}

export default function JobDetails(props: IProps) {
    const [viewMode, setViewMode] = useState(true);
    const { currentUser, updateUser } = useContext<any>(UserContext);

    const formRefs = {
        companyNameRef: useRef<HTMLInputElement>(null),
        jobTitleRef: useRef<HTMLInputElement>(null),
        locationRef: useRef<HTMLInputElement>(null),
        dateSubmittedRef: useRef<HTMLInputElement>(null),
        salaryRef: useRef<HTMLInputElement>(null),
        jobTypeRef: useRef<HTMLSelectElement>(null),
        applicationLinkRef: useRef<HTMLInputElement>(null),
        statusRef: useRef<HTMLSelectElement>(null),
        notesRef: useRef<HTMLTextAreaElement>(null),
    };

    if (props.currentApplication === null) {
        return <></>
    }

    async function removeRecordHandler() {
        const applicationId = props.currentApplication._id;
        if (!applicationId) {
            return;
        }

        try {
            await removeApplicationRequest(currentUser.id, applicationId);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const applicationId = props.currentApplication._id;
        if (!applicationId) {
            return;
        }

        console.log(props.currentApplication.collectionName);

        const companyName = formRefs.companyNameRef.current?.value;
        const jobTitle = formRefs.jobTitleRef.current?.value;
        const jobType = formRefs.jobTypeRef.current?.value;
        const location = formRefs.locationRef.current?.value;
        const dateSubmitted = formRefs.dateSubmittedRef.current?.value || "";
        const salary = formRefs.salaryRef.current?.value || "";
        const link = formRefs.applicationLinkRef?.current?.value;
        const status = formRefs.statusRef.current?.value;
        const notes = formRefs.notesRef.current?.value || "";

        if (!companyName || !jobTitle || !location || !link || !status || !jobType || !props.currentApplication.collectionName) {
            return;
        }

        // check to make sure the link is valid
        const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        if (!link.match(linkRegex)) {
            console.log(`not valid link`);
            return;
        }

        const newApplication: IApplication = {
            companyName: companyName,
            jobTitle: jobTitle,
            link: link,
            location: location,
            jobType: jobType,
            dateSubmitted: dateSubmitted,
            salary: salary,
            status: status,
            notes: notes,
            _id: props.currentApplication._id
        }

        try {
            await editApplicationRequest(currentUser.id, props.currentApplication.collectionName, newApplication);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return <div className={modalStyles.backdrop}>
        {viewMode ?
            <div className={modalStyles.modal}>
                <h1>View your Record</h1>
                <div className={styles.outerContainer}>
                    <div className={styles.innerContainer}>
                        <div className={styles.title}>Company Name</div>
                        <div className={styles.desc}>{props.currentApplication.companyName}</div>
                    </div>

                    <div className={styles.innerContainer}>
                        <div className={styles.title}>Job Title</div>
                        <div className={styles.desc}>{props.currentApplication.jobTitle}</div>
                    </div>
                    <div className={styles.innerContainer}>
                        <div className={styles.title}>Job Type</div>
                        <div className={styles.desc}>{props.currentApplication.jobType}</div>
                    </div>

                    <div className={styles.innerContainer}>
                        <div className={styles.title}>Status</div>
                        <div className={styles.desc}>{props.currentApplication.status}</div>
                    </div>
                    <div className={styles.innerContainer}>
                        <div className={styles.title}>Location</div>
                        <div className={styles.desc}>{props.currentApplication.location}</div>
                    </div>

                    <div className={styles.innerContainer}>
                        <div className={styles.title}>Date Submitted</div>
                        {props.currentApplication.dateSubmitted ? <div className={styles.desc}>{props.currentApplication.dateSubmitted}</div> : <div className={styles.desc}>N/A</div>}
                    </div>
                </div>

                <div className={styles.innerContainer}>
                    <div className={styles.title}>Application Link</div>
                    <div className={styles.desc}>{props.currentApplication.link}</div>
                </div>

                <div className={styles.innerContainer}>
                    <div className={styles.title}>Salary</div>
                    {props.currentApplication.salary ? <div className={styles.desc}>{props.currentApplication.salary}</div> : <div className={styles.desc}>N/A</div>}
                </div>

                <div className={styles.innerContainer}>
                    <div className={styles.title}>Notes</div>
                    {props.currentApplication.notes ? <div className={styles.desc}>{props.currentApplication.notes}</div> : <div className={styles.desc}>N/A</div>}
                </div>
                <div className={styles.btnContainer}>
                    <button type="button" onClick={removeRecordHandler}>Remove Record</button>
                    <button type="button" onClick={() => setViewMode(false)}>Edit Record</button>
                    <button type="button" onClick={() => props.setApplicationDetails({ ...props.currentApplication, visible: false })}>Done</button>
                </div>
            </div> :
            <div className={modalStyles.modal}>
                <h1>Edit Your Records</h1>
                <form onSubmit={submitHandler} className={modalStyles.container}>
                    <label>Company Name</label>
                    <input defaultValue={props.currentApplication.companyName} ref={formRefs.companyNameRef} />

                    <label>Job Title</label>
                    <input defaultValue={props.currentApplication.jobTitle} ref={formRefs.jobTitleRef} />

                    <label>Location</label>
                    <input defaultValue={props.currentApplication.location} ref={formRefs.locationRef} />

                    <label>Application Link</label>
                    <input defaultValue={props.currentApplication.link} ref={formRefs.applicationLinkRef} />

                    <label>Job Type</label>
                    <select defaultValue={props.currentApplication.jobType} ref={formRefs.jobTypeRef}>
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Full-Time Internship</option>
                        <option>Part-Time Internship</option>
                        <option>Temporary</option>
                        <option>Contract</option>
                        <option>Volunteer</option>
                        <option>Unpaid Internship</option>
                        <option>Other</option>
                    </select>

                    <label>Status</label>
                    <select defaultValue={props.currentApplication.status} ref={formRefs.statusRef}>
                        <option>Application Sent</option>
                        <option>Online Assessment (OA)</option>
                        <option>Phone Interview</option>
                        <option>Technical Interview</option>
                        <option>Interview</option>
                        <option>Behavioral Interview</option>
                        <option>On-Site Interview</option>
                        <option>Final Interview</option>
                        <option>Rejected</option>
                        <option>Offer</option>
                        <option>Declined</option>
                        <option>Ghosted</option>
                    </select>

                    <label>Date Submitted</label>
                    <input defaultValue={props.currentApplication.dateSubmitted} type="date" style={{ "width": "20%" }} />

                    <label>Salary</label>
                    <input defaultValue={props.currentApplication.salary} type="number" />

                    <label>Notes</label>
                    <textarea defaultValue={props.currentApplication.notes} style={{ "height": "100px" }} />

                    <div className={modalStyles.btnContainer}>
                        <button type="button" onClick={() => props.setApplicationDetails({ ...props.currentApplication, visible: false })}>Cancel</button>
                        <button type="button" onClick={removeRecordHandler}>Remove Record</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>}
    </div>
}