import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import CollectionTable from "./Components/CollectionTable/CollectionTable";
import StaticTable from "./Components/StaticTable/StaticTable";
import styles from "./Home.module.scss";
import { siGithub } from "simple-icons";

export default function Home() {
    const [loginMode, setLoginMode] = useState(true);

    useEffect(() => {
        document.title = "Job Application Tracker";
    }, [])

    return (
        <>
            <main className={`${styles.gridContainer}`}>
                <div className={styles.mainContent}>
                    <h1>Job Application Tracker</h1>
                    <p>
                        Organize and track each application with ease.
                    </p>
                </div>
                {loginMode ? <Login setVisible={setLoginMode} /> : <Register switchBackToLogin={setLoginMode} />}
            </main>

            <div className={styles.container}>
                <h2>Create Unlimited Applications</h2>
                <StaticTable />
            </div>

            <div className={styles.container}>
                <h2>Keep Unlimited Collections</h2>
                <CollectionTable />
            </div>

            <footer>
                <div>Built using React, Express, PostgreSQL, and MongoDB</div>
                <div>
                    <a href="https://github.com/Charptr0/Job-Application-Tracker" target="_blank" rel="noreferrer"><img width="40" height="40" src={`https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/${siGithub.slug}.svg`} alt="github-logo"></img></a>
                </div>
            </footer>
        </>
    )
}