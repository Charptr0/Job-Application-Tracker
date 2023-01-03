import React, { useContext, useRef } from "react";
import modalStyles from "../../Utils/Styles/modal.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";
import { addApplicationRequest } from "../../../../Utils/Requests/addApplication";
import { UserContext } from "../../../../Context/UserContext";

interface IProps {
    setVisible: Function,
}

export default function CreateApplication(props: IProps) {
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

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const currentCollectionName: string | undefined = document.getElementById("current-collection")?.innerHTML;
        const companyName = formRefs.companyNameRef.current?.value;
        const jobTitle = formRefs.jobTitleRef.current?.value;
        const jobType = formRefs.jobTypeRef.current?.value;
        const location = formRefs.locationRef.current?.value;
        const dateSubmitted = formRefs.dateSubmittedRef.current?.value || "";
        const salary = formRefs.salaryRef.current?.value || "";
        const link = formRefs.applicationLinkRef?.current?.value;
        const status = formRefs.statusRef.current?.value;
        const notes = formRefs.notesRef.current?.value || "";

        if (!companyName || !jobTitle || !location || !link || !status || !jobType || !currentCollectionName) {
            return;
        }

        // check to make sure the link is valid
        const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        if (!link.match(linkRegex)) {
            console.log(`not valid link`);
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

                <label>Position Name*</label>
                <input ref={formRefs.jobTitleRef} placeholder="Software Engineer, Data Scientist" />

                <label>Location*</label><br></br>
                <input ref={formRefs.locationRef} placeholder="Remote, NYC, San Francisco" /><br></br>

                <label>Application Link*</label><br></br>
                <input ref={formRefs.applicationLinkRef} placeholder="https://google.com" /><br></br>

                <label>Job Type*</label><br></br>
                <select ref={formRefs.jobTypeRef}>
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Full-Time Internship</option>
                    <option>Part-Time Internship</option>
                    <option>Temporary</option>
                    <option>Contract</option>
                    <option>Volunteer</option>
                    <option>Unpaid Internship</option>
                    <option>Other</option>
                </select><br></br>

                <label>Status*</label><br></br>
                <select ref={formRefs.statusRef}>
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
                </select><br></br>

                <label>Date Submitted</label><br></br>
                <input ref={formRefs.dateSubmittedRef} type="date" style={{ "width": "20%" }} /><br></br>

                <label>Salary</label><br></br>
                <input ref={formRefs.salaryRef} placeholder="89,000" type="number" /><br></br>

                <label>Notes</label><br></br>
                <textarea ref={formRefs.notesRef} style={{ "height": "100px" }} /><br></br>

                <div className={modalStyles.btnContainer}>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
}