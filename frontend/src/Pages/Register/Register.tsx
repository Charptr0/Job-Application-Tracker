
export default function Register() {

    function submitHandler(e: any) {
        e.preventDefault();

    }

    return (
        <div>
            Register

            <form onSubmit={submitHandler}>
                <label>Email</label><br></br>
                <input type="email" /> <br></br>

                <label>Password</label><br></br>
                <input type="password" /><br></br>

                <label>Confirm Password</label><br></br>
                <input type="password" /><br></br>

                <button>Submit</button><br></br>
            </form>
        </div>
    )
}