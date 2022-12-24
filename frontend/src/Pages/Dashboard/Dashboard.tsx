import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { authUserRequest } from "../../Utils/Requests/auth";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                await authUserRequest(token);

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