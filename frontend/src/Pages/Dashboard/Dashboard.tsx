import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { authUserRequest } from "../../Utils/Requests/auth";

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext<any>(UserContext);


    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                await authUserRequest(currentUser, token);

            } catch (err: any) {
                // route back to login screen
                localStorage.removeItem('token');
                navigate("/login");
            }
        }

        auth();
    }, [navigate]);
    return <div>Dashboard</div>
}