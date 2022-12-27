import React, { useRef } from "react";
import styles from "./CreateApplication.module.scss";

interface IApplication {
    companyName: string,
    jobTitle: string,
    appLink: string,
    location: string,
    status: string,
    dateSubmitted: string,
    salary?: string,
    notes?: string,
}

interface IProps {
    setVisible: Function,
    setApplication: Function,
}

export default function CreateApplication(props: IProps) {
    const formRefs = {
        companyNameRef: useRef<HTMLInputElement>(null),
        jobTitleRef: useRef<HTMLInputElement>(null),
        locationRef: useRef<HTMLInputElement>(null),
        dateSubmittedRef: useRef<HTMLInputElement>(null),
        salaryRef: useRef<HTMLInputElement>(null),
        applicationLinkRef: useRef<HTMLInputElement>(null),
        statusRef: useRef<HTMLSelectElement>(null),
        notesRef: useRef<HTMLTextAreaElement>(null),
    }

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const companyName = formRefs.companyNameRef.current?.value;
        const jobTitle = formRefs.jobTitleRef.current?.value;
        const location = formRefs.locationRef.current?.value;
        const dateSubmitted = formRefs.dateSubmittedRef.current?.value;
        const salary = formRefs.salaryRef.current?.value;
        const link = formRefs.applicationLinkRef?.current?.value;
        const status = formRefs.statusRef.current?.value;
        const notes = formRefs.notesRef.current?.value;

        if (!companyName || !jobTitle || !location || !link || !status || !dateSubmitted) {
            return;
        }

        props.setApplication((prev: IApplication[]): IApplication[] => [...prev, {
            companyName: companyName,
            jobTitle: jobTitle,
            appLink: link,
            location: location,
            dateSubmitted: dateSubmitted,
            salary: salary,
            status: status,
            notes: notes,
        }]);

        props.setVisible(false);
    }

    return <div id={styles.backdrop}>
        <div id={styles.modal}>
            <h1>Create a New Record</h1>
            <form onSubmit={submitHandler} className={styles.container}>
                <label>Company Name</label>
                <input ref={formRefs.companyNameRef} placeholder="Google, Amazon, Microsoft..." />

                <label>Position Name</label>
                <input ref={formRefs.jobTitleRef} placeholder="Software Engineer, Data Scientist" />

                <label>Location</label><br></br>
                <input ref={formRefs.locationRef} placeholder="Remote, NYC, San Francisco, California" /><br></br>

                <label>Date Submitted</label><br></br>
                <input ref={formRefs.dateSubmittedRef} placeholder="Remote, NYC, San Francisco, California" type="date" /><br></br>

                <label>Application Link</label><br></br>
                <input ref={formRefs.applicationLinkRef} placeholder="http://google.com" /><br></br>

                <label>Status</label><br></br>
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

                <label>Salary</label><br></br>
                <input ref={formRefs.salaryRef} placeholder="89,000" type="number" /><br></br>

                <label>Notes</label><br></br>
                <textarea ref={formRefs.notesRef} /><br></br>

                <div className={styles.btnContainer}>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
}