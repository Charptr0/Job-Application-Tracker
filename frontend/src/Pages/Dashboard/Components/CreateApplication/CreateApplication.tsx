import React, { useContext, useReducer, useRef, useState } from "react";
import modalStyles from "../../Utils/Styles/modal.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";
import { addApplicationRequest } from "../../../../Utils/Requests/addApplication";
import { UserContext } from "../../../../Context/UserContext";
import styles from "./CreateApplication.module.scss";
import { applicationWarningMessagesInitState, applicationWarningMessagesReducer, APPLICATION_WARNING_MESSAGES_ERR_TYPE } from "../../Utils/Reducers/applicationWarningMessageReducer";

interface IProps {
    setVisible: Function,
}

export default function CreateApplication(props: IProps) {
    const { currentUser, updateUser } = useContext<any>(UserContext);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const [state, dispatch] = useReducer(applicationWarningMessagesReducer, applicationWarningMessagesInitState);


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

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSubmitButtonDisabled(true);

        const currentCollectionName: string | null | undefined = document.getElementById("current-collection")?.textContent;
        const companyName = formRefs.companyNameRef.current?.value;
        const jobTitle = formRefs.jobTitleRef.current?.value;
        const jobType = formRefs.jobTypeRef.current?.value;
        const location = formRefs.locationRef.current?.value;
        const dateSubmitted = formRefs.dateSubmittedRef.current?.value || "";
        const salary = formRefs.salaryRef.current?.value || "";
        const link = formRefs.applicationLinkRef?.current?.value;
        const status = formRefs.statusRef.current?.value;
        const notes = formRefs.notesRef.current?.value || "";

        if (!companyName) {
            dispatch({ type: APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_COMPANY_NAME });
            setSubmitButtonDisabled(false);
            return;
        }

        if (!jobTitle) {
            dispatch({ type: APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_POSITION_NAME });
            setSubmitButtonDisabled(false);
            return;
        }

        if (!location) {
            dispatch({ type: APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_LOCATION });
            setSubmitButtonDisabled(false);
            return;
        }

        if (!link) {
            dispatch({ type: APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_LINK });
            setSubmitButtonDisabled(false);
            return;
        }

        // check to make sure the link is valid
        const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        if (!link.match(linkRegex)) {
            dispatch({ type: APPLICATION_WARNING_MESSAGES_ERR_TYPE.INVALID_LINK });
            setSubmitButtonDisabled(false);
            return;
        }

        if (!jobType) {
            dispatch({ type: APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_JOB_TYPE });
            setSubmitButtonDisabled(false);
            return;
        }

        if (!status) {
            dispatch({ type: APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_STATUS });
            setSubmitButtonDisabled(false);
            return;
        }

        if (!currentCollectionName) {
            return;
        }

        const application: IApplication = {
            companyName: companyName,
            jobTitle: jobTitle,
            link: link,
            location: location,
            jobType: jobType,
            dateSubmitted: dateSubmitted,
            salary: salary,
            status: status,
            notes: notes,

        }

        // add to database
        try {
            await addApplicationRequest(currentUser.id, currentCollectionName, application);
        } catch (err) {
            console.log(`Server err`);
        }

        props.setVisible(false);
        window.location.reload();
    }

    return <div className={modalStyles.backdrop}>
        <div className={modalStyles.modal}>
            <h1>Create a New Record</h1>
            <form onSubmit={submitHandler} className={modalStyles.container}>
                <label>Company Name*</label>
                <input ref={formRefs.companyNameRef} placeholder="Google, Amazon, Microsoft..." />
                {state.companyName.visible && <div className={styles.warningMessage}>{state.companyName.message}</div>}

                <label>Position Name*</label>
                <input ref={formRefs.jobTitleRef} placeholder="Software Engineer, Data Scientist" />
                {state.positionName.visible && <div className={styles.warningMessage}>{state.positionName.message}</div>}

                <label>Location*</label>
                <input ref={formRefs.locationRef} placeholder="Remote, NYC, San Francisco" />
                {state.location.visible && <div className={styles.warningMessage}>{state.location.message}</div>}

                <label>Application Link*</label>
                <input ref={formRefs.applicationLinkRef} placeholder="https://google.com" />
                {state.link.visible && <div className={styles.warningMessage}>{state.link.message}</div>}

                <label>Job Type*</label>
                <select ref={formRefs.jobTypeRef}>
                    <option></option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Full Time Internship</option>
                    <option>Part Time Internship</option>
                    <option>Temporary</option>
                    <option>Contract</option>
                    <option>Volunteer</option>
                    <option>Unpaid Internship</option>
                    <option>Other</option>
                </select>
                {state.jobType.visible && <div className={styles.warningMessage}>{state.jobType.message}</div>}

                <label>Status*</label>
                <select ref={formRefs.statusRef}>
                    <option></option>
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
                {state.status.visible && <div className={styles.warningMessage}>{state.status.message}</div>}

                <label>Date Submitted</label>
                <input ref={formRefs.dateSubmittedRef} type="date" style={{ "width": "30%" }} />

                <label>Salary</label>
                <input ref={formRefs.salaryRef} placeholder="89,000" type="number" />

                <label>Notes</label>
                <textarea ref={formRefs.notesRef} style={{ "height": "100px" }} />

                <div className={modalStyles.btnContainer}>
                    <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>
                    <button type="submit" disabled={submitButtonDisabled}>Submit</button>
                </div>
            </form>
        </div>
    </div>
}