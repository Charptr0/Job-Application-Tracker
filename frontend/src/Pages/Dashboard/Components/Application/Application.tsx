import { IApplication } from "../../Utils/Interfaces/IApplication";
import styles from "./Application.module.scss";
import parentStyles from "../ApplicationList/ApplicationList.module.scss";

interface IProps {
    application: IApplication,
    onClick: any,
}

export default function Application(props: IProps) {
    return (<tr onClick={props.onClick}
        className={`${styles.row} ${props.application.status === 'Offer' ? styles.offer : props.application.status === 'Rejected' ? styles.rejected : null}`}>
        <td className={parentStyles.companyName}>{props.application.companyName}</td>
        <td className={parentStyles.jobTitle}>{props.application.jobTitle}</td>
        <td className={parentStyles.jobType}>{props.application.jobType}</td>
        <td className={parentStyles.location}>{props.application.location}</td>
        <td className={parentStyles.appLink}><a href={props.application.link}>Link</a></td>
        <td className={parentStyles.status}>{props.application.status}</td>
    </tr>)
}