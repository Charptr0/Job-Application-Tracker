import React from "react";
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

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        props.setApplication((prev: IApplication[]): IApplication[] => [...prev, {
            companyName: "Name",
            jobTitle: "Job Title",
            appLink: "google.com",
            location: "location",
            status: "Status",
        }]);

        props.setVisible(false);
    }

    return <div id={styles.backdrop}>
        <div id={styles.modal}>
            <h1>Create a New Record</h1>
            <form onSubmit={submitHandler}>
                <label>Company Name</label><br></br>
                <input /><br></br>

                <label>Position Name</label><br></br>
                <input /><br></br>


                <label>Location</label><br></br>
                <input /><br></br>


                <label>Application Link</label><br></br>
                <input /><br></br>


                <label>Status</label><br></br>
                <input /><br></br>

                <label>Notes</label><br></br>
                <textarea /><br></br>

                <button type="submit">Submit</button>
                <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>
            </form>
        </div>
    </div>
}