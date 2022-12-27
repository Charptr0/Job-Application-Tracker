import React, { useRef } from "react";
import styles from "./CreateApplication.module.scss";

interface IApplication {
    companyName: string,
    jobTitle: string,
    appLink: string,
    location: string,
    status: string,
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
        applicationLinkRef: useRef<HTMLInputElement>(null),
        statusRef: useRef<HTMLInputElement>(null),
        notesRef: useRef<HTMLTextAreaElement>(null),
    }

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const companyName = formRefs.companyNameRef.current?.value;
        const jobTitle = formRefs.jobTitleRef.current?.value;
        const location = formRefs.locationRef.current?.value;
        const link = formRefs.applicationLinkRef.current?.value;
        const status = formRefs.statusRef.current?.value;
        const notes = formRefs.notesRef.current?.value;

        if (!companyName || !jobTitle || !location || !link || !status) {
            return;
        }

        props.setApplication((prev: IApplication[]): IApplication[] => [...prev, {
            companyName: companyName,
            jobTitle: jobTitle,
            appLink: link,
            location: location,
            status: status,
            notes: notes,
        }]);

        props.setVisible(false);
    }

    return <div id={styles.backdrop}>
        <div id={styles.modal}>
            <h1>Create a New Record</h1>
            <form onSubmit={submitHandler}>
                <label>Company Name</label><br></br>
                <input ref={formRefs.companyNameRef} /><br></br>

                <label>Position Name</label><br></br>
                <input ref={formRefs.jobTitleRef} /><br></br>


                <label>Location</label><br></br>
                <input ref={formRefs.locationRef} /><br></br>


                <label>Application Link</label><br></br>
                <input ref={formRefs.applicationLinkRef} /><br></br>


                <label>Status</label><br></br>
                <input ref={formRefs.statusRef} /><br></br>

                <label>Notes</label><br></br>
                <textarea ref={formRefs.notesRef} /><br></br>

                <button type="submit">Submit</button>
                <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>
            </form>
        </div>
    </div>
}