import modalStyles from "../../Utils/Styles/modal.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";
import { useRef, useState } from "react";

interface IProps {
    currentApplication: IApplication,
    setApplicationDetails: Function,
}

export default function JobDetails(props: IProps) {
    const [viewMode, setViewMode] = useState(true);

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

    }

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const companyName = formRefs.companyNameRef.current?.value;
        const jobTitle = formRefs.jobTitleRef.current?.value;
        const jobType = formRefs.jobTypeRef.current?.value;
        const location = formRefs.locationRef.current?.value;
        const dateSubmitted = formRefs.dateSubmittedRef.current?.value;
        const salary = formRefs.salaryRef.current?.value;
        const link = formRefs.applicationLinkRef?.current?.value;
        const status = formRefs.statusRef.current?.value;
        const notes = formRefs.notesRef.current?.value;

        if (!companyName || !jobTitle || !location || !link || !status || !jobType) {
            return;
        }

        // check to make sure the link is valid
        const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        if (!link.match(linkRegex)) {
            console.log(`not valid link`);
            return;
        }

        const newApplicationDetails: IApplication = {
            companyName,
            jobTitle,
            jobType,
            location,
            dateSubmitted,
            salary,
            link,
            status,
            notes,
        }

        setViewMode(true);
        props.setApplicationDetails({ application: newApplicationDetails, visible: false });
    }

    return <div className={modalStyles.backdrop}>
        {viewMode ?
            <div className={modalStyles.modal}>
                <h1>View your Record</h1>
                <div>
                    <h2>Company Name</h2>
                    <div>{props.currentApplication.companyName}</div>
                </div>

                <div>
                    <h2>Job Title</h2>
                    <div>{props.currentApplication.jobTitle}</div>
                </div>

                <div>
                    <h2>Location</h2>
                    <div>{props.currentApplication.location}</div>
                </div>

                <div>
                    <h2>Application Link</h2>
                    <div>{props.currentApplication.link}</div>
                </div>

                <div>
                    <h2>Job Type</h2>
                    <div>{props.currentApplication.jobType}</div>
                </div>

                <div>
                    <h2>Status</h2>
                    <div>{props.currentApplication.status}</div>
                </div>

                <div>
                    <h2>Date Submitted</h2>
                    {props.currentApplication.dateSubmitted ? <div>{props.currentApplication.dateSubmitted}</div> : <div>N/A</div>}
                </div>

                <div>
                    <h2>Salary</h2>
                    {props.currentApplication.salary ? <div>{props.currentApplication.salary}</div> : <div>N/A</div>}
                </div>

                <div>
                    <h2>Notes</h2>
                    {props.currentApplication.notes ? <div>{props.currentApplication.notes}</div> : <div>N/A</div>}
                </div>

                <div>
                    <button type="button" onClick={() => setViewMode(false)}>Edit Record</button>
                    <button type="button" onClick={removeRecordHandler}>Remove Record</button>
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