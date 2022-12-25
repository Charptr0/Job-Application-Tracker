import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { authUserRequest } from "../../Utils/Requests/auth";
import { logoutRequest } from "../../Utils/Requests/logout";
import ApplicationList from "./Components/ApplicationList/ApplicationList";
import CreateApplication from "./Components/CreateApplication/CreateApplication";

interface IApplication {
    companyName: string,
    jobTitle: string,
    appLink: string,
    location: string,
    status: string,
    notes?: string,
}

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext<any>(UserContext);
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [createApplicationScreen, showCreateApplicationScreen] = useState(false);


    async function logoutHandler() {
        try {
            await logoutRequest();
            localStorage.removeItem('token');
        } catch (err) {
            console.error(err);
        }

        navigate("/login");
    }

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await authUserRequest(token);

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

    if (!currentUser) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>Dashboard</h1>
        <h2>Cluster 1</h2>
        <button onClick={() => showCreateApplicationScreen(true)}>+</button>
        {createApplicationScreen && <CreateApplication />}

        {applications.length > 0 ? <ApplicationList /> : <div>No Application</div>}
        <button onClick={logoutHandler}>Logout</button>
    </div>
}