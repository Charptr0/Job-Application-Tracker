import { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import CollectionTable from "./Components/CollectionTable/CollectionTable";
import StaticTable from "./Components/StaticTable/StaticTable";
import styles from "./Home.module.scss";

export default function Home() {
    const [loginMode, setLoginMode] = useState(true);

    return (
        <>
            <main className={`${styles.container}`}>
                <div className={styles.mainContent}>
                    <h1>Job Application Tracker</h1>
                    <p>
                        Organize and track each application with ease.
                    </p>
                </div>
                {loginMode ? <Login setVisible={setLoginMode} /> : <Register switchBackToLogin={setLoginMode} />}
            </main>

            <div className={styles.container}>
                <div>
                    <h2>Create Unlimited Applications</h2>
                </div>
                <div>
                    <StaticTable />
                </div>
            </div>

            <div className={styles.container}>
                <div><CollectionTable /></div>
                <div>
                    <h2>Keep Unlimited Collections</h2>
                </div>
            </div>

            <footer>
            </footer>
        </>
    )
}