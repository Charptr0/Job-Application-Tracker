import axios from "axios";
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { authUserRequest } from "../../Utils/Requests/auth";
import { loginUserRequest } from "../../Utils/Requests/login";
import styles from "./Login.module.scss";

interface LoginErrorMessageType {
    visible: boolean;
    message: string;
}

export default function Login() {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [loginErrorMessage, setLoginErrorMessage] = useState<LoginErrorMessageType>({
        visible: false,
        message: ""
    });

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // disable submit button
        setSubmitButtonDisabled(true);
        setLoginErrorMessage({ visible: false, message: "" });

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            setLoginErrorMessage({
                visible: true,
                message: "Invalid Email or Password"
            });
            setSubmitButtonDisabled(false);
            return;
        };

        const req = { email, password }

        try {
            const res = await loginUserRequest(req);
            console.log(res);

            localStorage.setItem("token", res.data);

            navigate("/dashboard");

        } catch (err: any) {
            const statusCode: number = err.response.status;

            // invalid email or password
            if (statusCode === 400) {
                setLoginErrorMessage({
                    visible: true,
                    message: "Invalid Email or Password"
                });
            }

            // server email
            else {
                setLoginErrorMessage({
                    visible: true,
                    message: "Internal Server Error"
                });
            }
        }

        setSubmitButtonDisabled(false);
    }


    return <div id={styles.loginScreen}>
        <h1>Login</h1>

        <form onSubmit={submitHandler} className={styles.form}>
            {loginErrorMessage.visible && <div id={styles.errorMessage}>{loginErrorMessage.message}</div>}
            <label>Email</label><br></br>
            <input type="email" ref={emailRef} /> <br></br>

            <label>Password</label><br></br>
            <input type="password" ref={passwordRef} /><br></br>

            <div className={styles.btnHolder}>
                <button disabled={submitButtonDisabled}>Login</button>
                <button disabled={submitButtonDisabled} type="button" onClick={() => navigate("/register")}>Register</button>
            </div>
        </form>

    </div>
}