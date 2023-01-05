import styles from "./StaticTable.module.scss";

export default function StaticTable() {
    return (<table className={styles.table}>
        <tbody>
            <tr>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Location</th>
                <th>Application Link</th>
                <th>Status</th>
            </tr>

            <tr>
                <td>Company W</td>
                <td>Position A</td>
                <td>Full-Time</td>
                <td>Remote</td>
                <td>Link</td>
                <td>Application Sent</td>
            </tr>
            <tr>
                <td>Company X</td>
                <td>Position B</td>
                <td>Full-Time</td>
                <td>New York, NY</td>
                <td>Link</td>
                <td>Initial Interview</td>
            </tr>
            <tr>
                <td>Company Y</td>
                <td>Position C</td>
                <td>Part-Time</td>
                <td>Boston, MA</td>
                <td>Link</td>
                <td>Final Interview</td>
            </tr>
            <tr>
                <td>Company Z</td>
                <td>Position D</td>
                <td>Internship</td>
                <td>Remote</td>
                <td>Link</td>
                <td>Offer</td>
            </tr>
        </tbody>
    </table>)
}