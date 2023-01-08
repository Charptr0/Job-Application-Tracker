import { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserRequest } from "../../Utils/Requests/register";
import { verifyUsername } from "./Utils/verify/verifyUsername";
import { ERR_TYPE } from "./Utils/types/error_types";
import { verifyEmail } from "./Utils/verify/verifyEmail";
import styles from "./Register.module.scss";
import { verifyPassword } from "./Utils/verify/verifyPassword";

interface RequestObject {
    username: string,
    email: string,
    password: string,
}

interface IRegisterWarningMessages {
    email: {
        visible: boolean,
        message: string,
    },

    username: {
        visible: boolean,
        message: string,
    }

    password: {
        visible: boolean,
        message: string,
    }

    confirmPassword: {
        visible: boolean,
        message: string,
    }
}

interface IAction {
    type: ERR_TYPE,

}

const reducerInitState: IRegisterWarningMessages = {
    email: {
        visible: false,
        message: ""
    },
    username: {
        visible: false,
        message: ""
    },

    password: {
        visible: false,
        message: ""
    },

    confirmPassword: {
        visible: false,
        message: ""
    },
}

function reducer(state: IRegisterWarningMessages, action: IAction): IRegisterWarningMessages {
    switch (action.type) {
        case ERR_TYPE.NO_EMAIL:
            return {
                email: { visible: true, message: "This field cannot be empty" },
                username: { ...state.username, visible: false },
                password: { ...state.password, visible: false },
                confirmPassword: { ...state.confirmPassword, visible: false },
            }

        case ERR_TYPE.INVALID_EMAIL:
            return {
                email: { visible: true, message: "The email entered is not valid" },
                username: { ...state.username, visible: false },
                password: { ...state.password, visible: false },
                confirmPassword: { ...state.confirmPassword, visible: false },
            }

        case ERR_TYPE.NO_USERNAME:
            return {
                email: { ...state.email, visible: false },
                username: { visible: true, message: "This field cannot be empty" },
                password: { ...state.password, visible: false },
                confirmPassword: { ...state.confirmPassword, visible: false },
            }

        case ERR_TYPE.USERNAME_TOO_SHORT:
            return {
                email: { ...state.email, visible: false },
                username: { visible: true, message: "The username is too short (Must be more than 3 characters)" },
                password: { ...state.password, visible: false },
                confirmPassword: { ...state.confirmPassword, visible: false }
            }

        case ERR_TYPE.NO_PASSWORD:
            return {
                email: { ...state.email, visible: false },
                username: { ...state.username, visible: false },
                password: { visible: true, message: "This field cannot be empty" },
                confirmPassword: { ...state.confirmPassword, visible: false }
            }

        case ERR_TYPE.INVALID_PASSWORD:
            return {
                email: { ...state.email, visible: false },
                username: { ...state.username, visible: false },
                password: { visible: true, message: "Password must have at least 8 characters" },
                confirmPassword: { ...state.confirmPassword, visible: false }
            }

        case ERR_TYPE.INVALID_CONFIRM_PASSWORD:
            return {
                email: { ...state.email, visible: false },
                username: { ...state.username, visible: false },
                password: { ...state.password, visible: false },
                confirmPassword: { message: "Password does not match", visible: true }
            }

        default: return reducerInitState;
    }
}

interface IProps {
    switchBackToLogin: Function,
}


export default function Register(props: IProps) {
    const navigate = useNavigate();

    // references
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [submitButtonDisabled, setButtonDisabled] = useState(false);

    // display error message below the text field
    const [state, dispatch] = useReducer(reducer, reducerInitState);

    // display error message of the response
    const [registerResponseError, setRegisterResponseError] = useState({
        visible: false,
        message: "",
    });

    async function submitHandler(e: any) {
        e.preventDefault();
        setRegisterResponseError({ visible: false, message: "" });
        dispatch({ type: ERR_TYPE.NO_ERR });

        // disable the submit button
        setButtonDisabled(true);

        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        // verify that the username is valid
        let err = verifyUsername(username);
        if (err) {
            dispatch({ type: err });
            setButtonDisabled(false);
            return;
        }

        // verify that the email is valid
        err = verifyEmail(email);
        if (err) {
            dispatch({ type: err });
            setButtonDisabled(false);
            return;
        }

        // verify that the username exists
        if (!username) {
            dispatch({ type: ERR_TYPE.NO_USERNAME });
            setButtonDisabled(false);
            return;
        }

        // verify that the password exists
        err = verifyPassword(password);
        if (err) {
            dispatch({ type: err });
            setButtonDisabled(false);
            return;
        }

        // check if password is equal to confirm password
        if (password !== confirmPassword) {
            dispatch({ type: ERR_TYPE.INVALID_CONFIRM_PASSWORD });
            setButtonDisabled(false);
            return;
        }

        if (!email || !password) return;
        const req: RequestObject = {
            username,
            email,
            password,
        }

        try {
            await registerUserRequest(req);
            navigate("/login");
        } catch (err: any) {
            const statusCode: number = err.response?.status;

            if (!statusCode) {
                setRegisterResponseError({
                    visible: true,
                    message: "Internal Server Error"
                });

                setButtonDisabled(false);
                return;
            }

            // duplicate email
            if (statusCode === 400) {
                setRegisterResponseError({
                    visible: true,
                    message: "Invalid Email",
                })
            }

            else {
                setRegisterResponseError({
                    visible: true,
                    message: "Internal Server Error"
                });
            }
        }

        // re-enable the submit button
        setButtonDisabled(false);
    }

    return (
        <div id={styles.registerScreen}>
            <h1>Register</h1>

            <form onSubmit={submitHandler}>
                {registerResponseError.visible && <div className={styles.responseErrMessage}>{registerResponseError.message}</div>}

                <label>Email</label><br></br>
                <input type="email" ref={emailRef} /> <br></br>
                {state.email.visible && <div className={styles.errMessage}>{state.email.message}</div>}

                <label>Username</label><br></br>
                <input ref={usernameRef} /> <br></br>
                {state.username.visible && <div className={styles.errMessage}>{state.username.message}</div>}

                <label>Password</label><br></br>
                <input type="password" ref={passwordRef} /><br></br>
                {state.password.visible && <div className={styles.errMessage}>{state.password.message}</div>}

                <label>Confirm Password</label><br></br>
                <input type="password" ref={confirmPasswordRef} /><br></br>
                {state.confirmPassword.visible && <div className={styles.errMessage}>{state.confirmPassword.message}</div>}

                <button disabled={submitButtonDisabled} className={styles.btn}>Register</button><br></br>
                <button disabled={submitButtonDisabled} onClick={() => props.switchBackToLogin(true)} className={styles.btn} type="button">Back to Login</button><br></br>

            </form>
        </div>
    )
}