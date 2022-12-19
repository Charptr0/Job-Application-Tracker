import axios from "axios";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import styles from "./Login.module.scss";

export default function Login() {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    async function submitHandler(e: any) {
        e.preventDefault();

        // disable submit button
        setSubmitButtonDisabled(true);

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            setSubmitButtonDisabled(false);
            return;
        };

        const req = {
            email,
            password
        }

        try {
            const res = await axios.post("http://localhost:4001/login", req);
            localStorage.setItem("token", res.data);
            navigate("/dashboard");

        } catch (err: any) {
            const statusCode: number = err.response.status;

            // duplicate number
            if (statusCode === 400) {
                console.log(`Email or password not correct`);
            }

            else {
                console.log(`Internal Server Error`);
            }
        }

        setSubmitButtonDisabled(false);
    }

    async function googleLoginOnSuccess(credentialResponse: any) {

        try {
            const res = await axios.post("http://localhost:4001/loginOauth", credentialResponse);
            console.log(credentialResponse);

            localStorage.setItem("token", res.data);
            navigate("/dashboard");

        } catch (err: any) {

        }
    }

    function googleLoginOnError() {

    }

    return <div id={styles.loginScreen}>
        <h1>Login</h1>

        <form onSubmit={submitHandler} className={styles.form}>
            <div id={styles.errorMessage}>Invalid Email or Password</div>
            <label>Email</label><br></br>
            <input type="email" ref={emailRef} /> <br></br>

            <label>Password</label><br></br>
            <input type="password" ref={passwordRef} /><br></br>

            <div className={styles.btnHolder}>
                <button disabled={submitButtonDisabled}>Login</button>
                <button disabled={submitButtonDisabled} type="button">Register</button>
            </div>
        </form>

        <GoogleLogin onSuccess={googleLoginOnSuccess} onError={() => googleLoginOnError} />
    </div>
}