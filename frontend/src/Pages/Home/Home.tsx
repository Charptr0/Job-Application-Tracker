import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (<div>
        <button onClick={() => navigate("/register")}>Register</button>
    </div>)
}