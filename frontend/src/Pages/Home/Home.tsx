import { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import styles from "./Home.module.scss";

export default function Home() {
    const [loginMode, setLoginMode] = useState(true);

    return (
        <>
            <main className={styles.gridContainer}>
                <div className={styles.mainContent}>
                    <h1>Job Application Tracker</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolor eos rerum suscipit omnis, facere voluptas ipsam commodi nam, maxime aperiam similique voluptatum deserunt saepe vel id, inventore nemo ullam!
                    </p>
                </div>
                {loginMode ? <Login setVisible={setLoginMode} /> : <Register switchBackToLogin={setLoginMode} />}
            </main>

            <div>
                <h2>About</h2>
            </div>
        </>
    )
}