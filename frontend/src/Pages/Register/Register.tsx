import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";

interface RequestObject {
    username: string,
    email: string,
    password: string,
}

export default function Register() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [submitButtonDisabled, setButtonDisabled] = useState(false);


    async function submitHandler(e: any) {
        e.preventDefault();

        // disable the submit button
        setButtonDisabled(true);

        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        // all fields must be filled
        if (!username || !email || !password || !confirmPassword) return;

        // check if password is equal to confirm password
        if (password !== confirmPassword) return;

        const req: RequestObject = {
            username,
            email,
            password,
        }

        try {
            await axios.put("http://localhost:4001/insertUser", req);
            console.log(`Success`);

        } catch (err: any) {
            const statusCode: number = err.response.status;

            // duplicate number
            if (statusCode === 400) {
                console.log(`Email already exist`);
            }

            else {
                console.log(`Internal Server Error`);
            }
        }

        // re-enable the submit button
        setButtonDisabled(false);
    }

    return (
        <div>
            Register

            <form onSubmit={submitHandler}>
                <label>Email</label><br></br>
                <input type="email" ref={emailRef} /> <br></br>

                <label>Username</label><br></br>
                <input type="text" ref={usernameRef} /> <br></br>

                <label>Password</label><br></br>
                <input type="password" ref={passwordRef} /><br></br>

                <label>Confirm Password</label><br></br>
                <input type="password" ref={confirmPasswordRef} /><br></br>

                <button disabled={submitButtonDisabled}>Register</button><br></br>
            </form>
        </div>
    )
}