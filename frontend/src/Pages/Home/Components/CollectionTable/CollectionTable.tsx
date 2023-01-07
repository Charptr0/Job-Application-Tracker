import { useRef, useState } from "react";
import { randomCollection } from "../../Utils/randomCollection";
import { randomJobApplication } from "../../Utils/randomJobApplication";
import styles from "./CollectionTable.module.scss";
import tableStyles from "../tableStyles.module.scss";

interface ISampleApplication {
    companyName: string;
    jobTitle: string;
    jobType: string;
    location: string;
    status: string;
}

interface IContainer {
    collectionName: string;
    applications: ISampleApplication[],
}

export default function CollectionTable() {

    const [sampleCollections, setSampleCollections] = useState<string[]>([]);
    const [sampleContainer, setSampleContainer] = useState<IContainer[]>([]);
    const [displayApplication, setDisplayApplication] = useState<ISampleApplication[]>([]);
    const [currentCollection, setCurrentCollection] = useState("");
    const selectCollectionRef = useRef<HTMLSelectElement>(null);


    function createCollectionHandler() {
        // add a random new collection
        const collection = randomCollection();
        setSampleCollections(prev => [...prev, collection]);
        setCurrentCollection(collection);

        // generate a number from [1,5]
        const randNum = Math.floor(Math.random() * 5) + 1;
        const apps: ISampleApplication[] = [];

        // generate random applications
        for (let i = 0; i < randNum; i++) {
            apps.push(randomJobApplication());
        }

        setSampleContainer(prev => [...prev, {
            collectionName: collection,
            applications: apps,
        }]);

        setDisplayApplication(apps);
    }

    function selectCollectionHandler() {
        const collection = selectCollectionRef.current?.value;

        if (!collection) return;

        setCurrentCollection(collection);

        const filteredApplications = sampleContainer.filter(container => container.collectionName === collection)[0];

        setDisplayApplication(filteredApplications.applications);
    }

    return (
        <>
            <select className={styles.selectCollection} ref={selectCollectionRef} onClick={selectCollectionHandler} id="select-sample-collection">
                <option>{currentCollection}</option>

                {sampleCollections.map((collection, i) => {
                    if (collection === currentCollection) return <></>;

                    return <option key={i} defaultValue="true">{collection}</option>
                })}
            </select>

            <table className={tableStyles.table}>
                <tbody>
                    <tr>
                        <th className={tableStyles.col1}>Company Name</th>
                        <th className={tableStyles.col2}>Job Title</th>
                        <th className={tableStyles.col3}>Job Type</th>
                        <th className={tableStyles.col4}>Location</th>
                        <th className={tableStyles.col5}>Application Link</th>
                        <th className={tableStyles.col6}>Status</th>
                    </tr>
                </tbody>
                {displayApplication.map((app, i) => {
                    return <tr key={i}>
                        <td className={tableStyles.col1}>{app.companyName}</td>
                        <td className={tableStyles.col2}>{app.jobTitle}</td>
                        <td className={tableStyles.col3}>{app.jobType}</td>
                        <td className={tableStyles.col4}>{app.location}</td>
                        <td className={tableStyles.col5}><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">Link</a></td>
                        <td className={tableStyles.col6}>{app.status}</td>
                    </tr>
                })}
            </table>

            <div className={tableStyles.btnContainer}>
                <button onClick={createCollectionHandler}>Create</button>
                <button onClick={() => setSampleCollections([])}>Reset</button>
            </div>
        </>
    )
}