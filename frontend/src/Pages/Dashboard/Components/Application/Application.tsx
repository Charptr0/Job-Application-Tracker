import { IApplication } from "../../Utils/Interfaces/IApplication";
import styles from "./Application.module.scss";

interface IProps {
    application: IApplication,
    onClick: any,
}

export default function Application(props: IProps) {
    return (<tr onClick={props.onClick} className={styles.row}>
        <td>{props.application.companyName}</td>
        <td>{props.application.jobTitle}</td>
        <td>{props.application.jobType}</td>
        <td>{props.application.location}</td>
        <td><a href={props.application.appLink}>Link</a></td>
        <td>{props.application.status}</td>
    </tr>)
}