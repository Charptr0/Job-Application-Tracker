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
        <td>{props.application.appLink}</td>
        <td>{props.application.status}</td>
    </tr>
}