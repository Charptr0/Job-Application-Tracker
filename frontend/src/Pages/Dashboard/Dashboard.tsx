import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem('token');

            try {
                const res = await axios.post("http://localhost:4001/auth", {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log(res.data);
            } catch (err: any) {
                const statusCode: number = err.response.status;

                // route back to login screen
                if (statusCode === 401) {
                    // localStorage.removeItem('token');
                    navigate("/login");
                }
            }


        }

        auth();
    }, [navigate]);
    return <div>Dashboard</div>
}