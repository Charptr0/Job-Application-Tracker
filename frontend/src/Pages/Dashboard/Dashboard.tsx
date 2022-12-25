import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { authUserRequest } from "../../Utils/Requests/auth";
import { logoutRequest } from "../../Utils/Requests/logout";

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext<any>(UserContext);

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

                if (res.data?.token) {
                    localStorage.setItem('token', res.data.token);
                }

            } catch (err: any) {
                // route back to login screen
                localStorage.removeItem('token');
                navigate("/login");
            }
        }
        auth();
    }, [navigate]);

    return <div>
        <h1>Dashboard</h1>
        <button onClick={logoutHandler}>Logout</button>
    </div>
}