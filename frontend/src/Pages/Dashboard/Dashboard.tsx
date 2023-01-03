import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { authUserRequest } from "../../Utils/Requests/auth";
import { logoutRequest } from "../../Utils/Requests/logout";
import ApplicationList from "./Components/ApplicationList/ApplicationList";
import CreateApplication from "./Components/CreateApplication/CreateApplication";
import CreateCollection from "./Components/CreateCollection/CreateCollection";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext<any>(UserContext);
    const [createApplicationScreen, showCreateApplicationScreen] = useState(false);
    const [createNewCollection, showCreateNewCollection] = useState(false);

    /**
     * Log the user out
     */
    async function logoutHandler() {
        try {
            await logoutRequest();
            localStorage.removeItem('token'); // remove token
        } catch (err) {
            console.error(err);
        }

        // route back to login page
        navigate("/login");
    }

    useEffect(() => {
        // authenticate user
        const auth = async () => {
            const token = localStorage.getItem('token');

            // no token 
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await authUserRequest(token);

                // auth successful
                localStorage.setItem('token', res.data.accessToken);
                updateUser({
                    id: res.data.id,
                    username: res.data.username,
                    email: res.data.email,
                });

            } catch (err: any) {
                // route back to login screen
                localStorage.removeItem('token');
                updateUser({});
                navigate("/login");
            }
        }
        auth();
    }, [navigate, updateUser]);

    async function addNewCollectionHandler() {

    }

    if (!currentUser) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>Dashboard</h1>
        {createApplicationScreen && <CreateApplication setVisible={showCreateApplicationScreen} />}
        {createNewCollection && <CreateCollection setVisible={showCreateNewCollection} />}

        <div className={styles.flexContainer}>
            <ApplicationList />
        </div>

        <div className={styles.flexContainer}>
            <button onClick={() => showCreateApplicationScreen(true)} id={styles.addNewAppBtn}>Add a New Application</button>
        </div>

        <button onClick={() => showCreateNewCollection(true)}>Add a New Collection</button>
        <button onClick={logoutHandler}>Logout</button>
    </div>
}