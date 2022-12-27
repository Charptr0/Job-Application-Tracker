import modalStyles from "../../Utils/Styles/modal.module.scss";
import { IApplication } from "../../Utils/Interfaces/IApplication";

interface IProps {
    application: IApplication | null,
    setVisible: Function,
}

export default function JobDetails(props: IProps) {
    if (props.application === null) {
        return <></>
    }

    return <div className={modalStyles.backdrop}>
        <div className={modalStyles.modal}>
            <h1>View your Record</h1>
            <div>
                <h2>Company Name</h2>
                <div>{props.application.companyName}</div>
            </div>

            <div>
                <h2>Job Title</h2>
                <div>{props.application.jobTitle}</div>
            </div>

            <div>
                <h2>Location</h2>
                <div>{props.application.location}</div>
            </div>

            <div>
                <h2>Application Link</h2>
                <div>{props.application.appLink}</div>
            </div>

            <div>
                <h2>Job Type</h2>
                <div>{props.application.jobType}</div>
            </div>

            <div>
                <h2>Status</h2>
                <div>{props.application.status}</div>
            </div>

            <div>
                <h2>Date Submitted</h2>
                {props.application.dateSubmitted ? <div>{props.application.dateSubmitted}</div> : <div>N/A</div>}
            </div>

            <div>
                <h2>Salary</h2>
                {props.application.salary ? <div>{props.application.salary}</div> : <div>N/A</div>}
            </div>

            <div>
                <h2>Notes</h2>
                {props.application.notes ? <div>{props.application.notes}</div> : <div>N/A</div>}
            </div>

            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>
            </div>
        </div>
    </div>
}