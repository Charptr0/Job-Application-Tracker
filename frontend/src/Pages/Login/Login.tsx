import React, { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { loginUserRequest } from "../../Utils/Requests/login";
import { setToken } from "../../Utils/Storage/setToken";
import styles from "./Login.module.scss";

interface LoginErrorMessageType {
    visible: boolean;
    message: string;
}

interface IProps {
    setVisible: Function;
}

export default function Login(props: IProps) {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { currentUser, updateUser } = useContext<any>(UserContext);

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

            updateUser({
                id: res.data.id,
                username: res.data.username,
                email: res.data.email,
            });

            setToken(res.data.accessToken);

            navigate("/dashboard");

        } catch (err: any) {
            const statusCode: number = err.response?.status;

            if (!statusCode) {
                setLoginErrorMessage({
                    visible: true,
                    message: "Internal Server Error"
                });

                setSubmitButtonDisabled(false);
                return;
            }

            // invalid email or password
            if (statusCode === 400) {
                setLoginErrorMessage({
                    visible: true,
                    message: "Invalid Email or Password"
                });
            }

            // server error
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
            {loginErrorMessage.visible && <div className={styles.errorMessage}>{loginErrorMessage.message}</div>}
            <label>Email</label><br></br>
            <input type="email" ref={emailRef} /> <br></br>

            <label>Password</label><br></br>
            <input type="password" ref={passwordRef} /><br></br>

            <button disabled={submitButtonDisabled} className={styles.btn}>Login</button>
            <button disabled={submitButtonDisabled} className={styles.btn} type="button" onClick={() => props.setVisible(false)}>Create a New Account</button>
        </form>
    </div>
}