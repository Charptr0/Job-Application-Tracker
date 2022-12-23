import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const req = async () => {
            await axios.get("http://localhost:4000/cookie", { withCredentials: true });
            console.log(document.cookie);

            await axios.get("http://localhost:4000/test", { withCredentials: true });
        }

        req();
    }, [])


    return (<div>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/login")}>Login</button>
    </div>)
}