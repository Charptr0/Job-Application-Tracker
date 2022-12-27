interface IApplication {
    companyName: string,
    jobTitle: string,
    appLink: string,
    location: string,
    status: string,
    notes?: string,
}

interface IProps {
    application: IApplication
}

export default function Application(props: IProps) {
    return <tr>
        <td>{props.application.companyName}</td>
        <td>{props.application.jobTitle}</td>
        <td>{props.application.location}</td>
        <td><a href={props.application.appLink}>Link</a></td>
        <td>{props.application.status}</td>
        {props.application.notes ? <td>{props.application.notes}</td> : <td>None</td>}
        <td><button>Remove</button></td>
    </tr>
}