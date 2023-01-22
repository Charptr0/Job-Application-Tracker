import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { authUserRequest } from "../../Utils/Requests/auth";
import { logoutRequest } from "../../Utils/Requests/logout";
import { getCollection } from "../../Utils/Storage/getCollection";
import { getToken } from "../../Utils/Storage/getToken";
import { setToken } from "../../Utils/Storage/setToken";
import ApplicationList from "./Components/ApplicationList/ApplicationList";
import CreateApplication from "./Components/CreateApplication/CreateApplication";
import CreateCollection from "./Components/CreateCollection/CreateCollection";
import Navbar from "./Components/Navbar/Navbar";
import RemoveCollection from "./Components/RemoveCollection/RemoveCollection";
import Settings from "./Components/Settings/Settings";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext<any>(UserContext);
    const [createApplicationScreen, showCreateApplicationScreen] = useState(false);
    const [createNewCollection, showCreateNewCollection] = useState(false);
    const [removeCollection, showRemoveCollection] = useState(false);
    const [settings, showSettings] = useState(false);

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

        // route back to the main page
        navigate("/");
    }

    useEffect(() => {
        // authenticate user
        const auth = async () => {
            const token = getToken();

            // no token 
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const res = await authUserRequest(token);

                // auth successful
                setToken(res.data.accessToken);

                updateUser({
                    id: res.data.id,
                    username: res.data.username,
                    email: res.data.email,
                });

            } catch (err: any) {
                // route back to login screen
                localStorage.removeItem('token');
                updateUser({});
                navigate("/");
            }
        }
        auth();
    }, [navigate, updateUser]);

    function addApplicationHandler() {
        if (getCollection() !== 'All') {
            showCreateApplicationScreen(true)
        }

        else {
            alert(`You cannot add a new application in the "All" collection`);
        }
    }

    function removeCollectionHandler() {
        if (getCollection() !== 'All') {
            showRemoveCollection(true)
        }

        else {
            alert(`You cannot remove the collection named "All"`);
        }
    }

    if (!currentUser) {
        return <div>Loading...</div>
    }

    if (settings) {
        return <>
            <Navbar logoutHandler={logoutHandler} displaySettings={() => showSettings(true)} hideSettings={() => showSettings(false)} />
            <Settings hideSettings={() => showSettings(false)} />
        </>
    }

    return <div>
        <Navbar logoutHandler={logoutHandler} displaySettings={() => showSettings(true)} hideSettings={() => showSettings(false)} />
        {createApplicationScreen && <CreateApplication setVisible={showCreateApplicationScreen} />}
        {createNewCollection && <CreateCollection setVisible={showCreateNewCollection} />}
        {removeCollection && <RemoveCollection setVisible={showRemoveCollection} />}

        <div className={styles.flexContainer}>
            <ApplicationList />
        </div>

        <div className={styles.flexContainer}>
            <button onClick={addApplicationHandler} className={styles.btnStyles}>Add a New Application</button>
            <button onClick={() => showCreateNewCollection(true)} className={styles.btnStyles} >Create a New Collection</button>
            <button onClick={removeCollectionHandler} className={styles.btnStyles}>Remove Collection</button>
        </div>
    </div>
}