import { useRef } from "react";
import axios from "axios";

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

    async function submitHandler(e: any) {
        e.preventDefault();

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

        const res = await axios.post("http://localhost:4001/insertUser", req);

        // registration unsuccessful
        if (res.status !== 200) {
            console.log(`problem`);
            return;
        }

        console.log(`success`);

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

                <button>Submit</button><br></br>
            </form>
        </div>
    )
}