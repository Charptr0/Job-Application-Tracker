import styles from "./CollectionTable.module.scss";

export default function CollectionTable() {



    return (
        <>
            <select className={styles.selectCollection}>
                <option defaultChecked={true}>Fall 2022 Season</option>
                <option>Summer 2022 Season</option>
                <option>Spring 2021 Season</option>
                <option>Part Time Collection</option>
            </select>

            <table>
                <tbody>
                    <tr>
                        <th>Company Name</th>
                        <th>Job Title</th>
                        <th>Job Type</th>
                        <th>Location</th>
                        <th>Application Link</th>
                        <th>Status</th>
                    </tr>
                </tbody>
            </table>
        </>
    )
}