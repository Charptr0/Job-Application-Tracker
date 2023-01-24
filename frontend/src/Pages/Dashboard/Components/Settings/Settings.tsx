import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import { authUserRequest } from "../../../../Utils/Requests/auth";
import { changeEmailRequest } from "../../../../Utils/Requests/changeEmail";
import { changePasswordRequest } from "../../../../Utils/Requests/changePassword";
import { changeUsernameRequest } from "../../../../Utils/Requests/changeUsername";
import { deleteUserRequest } from "../../../../Utils/Requests/deleteUser";
import { getToken } from "../../../../Utils/Storage/getToken";
import styles from "./Settings.module.scss";

enum SettingTypes {
    NONE, EMAIL, USERNAME, PASSWORD, DELETE_ACCOUNT
}

interface IProps {
    hideSettings: Function,
}

function getStatusCode(err: any) {
    if (!err) return null;

    return err.response?.status;
}

export default function Settings(props: IProps) {
    const navigate = useNavigate();

    const { currentUser } = useContext<any>(UserContext);
    const settingOptionRef = useRef<HTMLSelectElement>(null);
    const [prevOption, setPrevOption] = useState("");
    const [settingMode, setSettingMode] = useState<SettingTypes>(SettingTypes.NONE);

    const [warningMessage, setWarningMessage] = useState<string>("");

    const [disableSubmitButton, setDisableSubmitButton] = useState(false);

    const settingRef = {
        emailRef: useRef<HTMLInputElement>(null),
        usernameRef: useRef<HTMLInputElement>(null),
        newPasswordRef: useRef<HTMLInputElement>(null),
        confirmPasswordRef: useRef<HTMLInputElement>(null),
        deleteAccountRef: useRef<HTMLInputElement>(null),
        passwordRef: useRef<HTMLInputElement>(null),
    }


    function changeSettingOptionHandler() {
        const option = settingOptionRef.current?.value;

        if (option === undefined || prevOption === option) return;

        setPrevOption(option);
        setWarningMessage("");

        switch (option) {
            case "change my email": return setSettingMode(SettingTypes.EMAIL);
            case "change my username": return setSettingMode(SettingTypes.USERNAME);
            case "change my password": return setSettingMode(SettingTypes.PASSWORD);
            case "delete my account": return setSettingMode(SettingTypes.DELETE_ACCOUNT);
            default: return setSettingMode(SettingTypes.NONE);
        }
    }

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setWarningMessage("");

        const currentSetting = settingMode;
        const currentPassword = settingRef.passwordRef.current?.value;
        if (!currentPassword) {
            alert("You must enter your current password in order to perform this action");
            return;
        }

        setDisableSubmitButton(true);

        // authenticate the user
        try {
            const token = getToken();
            if (!token) return navigate("/");

            await authUserRequest(token);
        } catch (err) {
            navigate("/");
        }

        switch (currentSetting) {
            case SettingTypes.EMAIL:
                const newEmail = settingRef.emailRef.current?.value;

                if (newEmail === null || newEmail === undefined) { setDisableSubmitButton(false); return; }
                if (newEmail === "") { setDisableSubmitButton(false); setWarningMessage("This field cannot be empty"); return; }

                const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                // email is invalid
                if (!newEmail.match(emailRegex)) { setDisableSubmitButton(false); setWarningMessage("Invalid email address"); return; }

                try {
                    await changeEmailRequest(currentUser.id, newEmail, currentPassword);
                    navigate("/");
                } catch (err: any) {
                    const statusCode = getStatusCode(err);

                    if (!statusCode) setWarningMessage("Internal Server Error");
                    else if (statusCode === 404) setWarningMessage("This user does not exist");
                    else if (statusCode === 401) setWarningMessage("The current password is incorrect");
                    else if (statusCode === 409) setWarningMessage("This email address is already in use");
                    else setWarningMessage("Internal Server Error");

                    setDisableSubmitButton(false);
                }

                return;
            case SettingTypes.USERNAME:
                const newUsername = settingRef.usernameRef.current?.value;
                if (newUsername === undefined || newUsername === null) { setDisableSubmitButton(false); return; }
                if (newUsername === "") { setDisableSubmitButton(false); setWarningMessage("This field cannot be empty"); return; }

                try {
                    await changeUsernameRequest(currentUser.id, newUsername, currentPassword);
                    navigate("/");
                } catch (err) {
                    const statusCode = getStatusCode(err);

                    if (!statusCode) setWarningMessage("Internal Server Error");
                    else if (statusCode === 404) setWarningMessage("This user does not exist");
                    else if (statusCode === 401) setWarningMessage("The current password is incorrect");
                    else setWarningMessage("Internal Server Error");

                    setDisableSubmitButton(false);
                }

                return;
            case SettingTypes.PASSWORD:
                const newPassword = settingRef.newPasswordRef.current?.value;
                const confirmPassword = settingRef.confirmPasswordRef.current?.value;

                if (newPassword === undefined || newPassword === null) { setDisableSubmitButton(false); return; }
                else if (confirmPassword === undefined || confirmPassword === null) { setDisableSubmitButton(false); return; }
                else if (newPassword === "" || confirmPassword === "") { setDisableSubmitButton(false); setWarningMessage("One of these field is empty"); return; }
                else if (newPassword.length < 8) { setDisableSubmitButton(false); setWarningMessage("Password must be at least 8 characters"); return; }
                else if (newPassword !== confirmPassword) { setDisableSubmitButton(false); setWarningMessage("Password does not match"); return; }

                try {
                    await changePasswordRequest(currentUser.id, newPassword, currentPassword);
                    navigate("/");
                } catch (err) {
                    const statusCode = getStatusCode(err);

                    if (!statusCode) setWarningMessage("Internal Server Error");
                    else if (statusCode === 404) setWarningMessage("This user does not exist");
                    else if (statusCode === 401) setWarningMessage("The current password is incorrect");
                    else setWarningMessage("Internal Server Error");

                    setDisableSubmitButton(false);
                }

                return;
            case SettingTypes.DELETE_ACCOUNT:
                const confirmMessage = settingRef.deleteAccountRef.current?.value;

                if (confirmMessage === undefined || confirmMessage === null) { setDisableSubmitButton(false); return; }
                if (confirmMessage !== currentUser.username) { setDisableSubmitButton(false); setWarningMessage("Username does not match"); return; }

                try {
                    await deleteUserRequest(currentUser.id, currentPassword);
                    navigate("/");
                } catch (err) {
                    const statusCode = getStatusCode(err);

                    if (!statusCode) setWarningMessage("Internal Server Error");
                    else if (statusCode === 404) setWarningMessage("This user does not exist");
                    else if (statusCode === 401) setWarningMessage("The current password is incorrect");
                    else setWarningMessage("Internal Server Error");

                    setDisableSubmitButton(false);
                }

                return;
            default: return;
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} className={styles.settingContainer}>
                <div className={styles.title}>Settings</div>
                <div className={styles.changeOptionsContainer}><span>I want to </span>
                    <select ref={settingOptionRef} onClick={changeSettingOptionHandler}>
                        <option></option>
                        <option>change my email</option>
                        <option>change my username</option>
                        <option>change my password</option>
                        <option>delete my account</option>
                    </select>
                </div>

                <div className={styles.flexContainer}>
                    {settingMode === SettingTypes.EMAIL && <div className={styles.wrapper}>
                        <div className={styles.innerContainer}>
                            <label>New Email: </label>
                            <input defaultValue={currentUser.email} ref={settingRef.emailRef} type="email" /><br></br>
                        </div>
                        {warningMessage.length > 0 && <div className={styles.warningMessage}>{warningMessage}</div>}
                    </div>}

                    {settingMode === SettingTypes.USERNAME && <div className={styles.wrapper}>
                        <div className={styles.innerContainer}>
                            <label>New Username: </label>
                            <input defaultValue={currentUser.username} ref={settingRef.usernameRef} />
                        </div>
                        {warningMessage.length > 0 && <div className={styles.warningMessage}>{warningMessage}</div>}
                    </div>}

                    {settingMode === SettingTypes.PASSWORD && <div className={styles.wrapper}>
                        <div className={`${styles.innerContainer} ${styles.passwordContainer}`}>
                            <label>New Password: </label>
                            <input type="password" ref={settingRef.newPasswordRef} /><br></br>

                            <label>Confirm New Password: </label>
                            <input type="password" ref={settingRef.confirmPasswordRef} /><br></br>

                        </div>
                        {warningMessage.length > 0 && <div className={`${styles.warningMessage} ${styles.passwordWarningMessage}`}>{warningMessage}</div>}
                    </div>}

                    {settingMode === SettingTypes.DELETE_ACCOUNT && <div className={styles.wrapper}>
                        <div className={`${styles.innerContainer} ${styles.flexCol}`}>
                            <label>Enter your <span style={{ "color": "green" }}>username</span> to confirm this action </label>
                            <input ref={settingRef.deleteAccountRef} defaultValue="" />
                        </div>
                        {warningMessage.length > 0 && <div className={styles.warningMessage}>{warningMessage}</div>}
                    </div>}

                </div>

                {settingMode !== SettingTypes.NONE && <div className={styles.confirmActionContainer}>
                    <label>Current Password:</label>
                    <input type="password" ref={settingRef.passwordRef} defaultValue="" />

                    <div className={styles.btnContainer}>
                        <button type="button" onClick={() => props.hideSettings()} disabled={disableSubmitButton}>Cancel</button>
                        <button disabled={disableSubmitButton}>Perform Action</button>
                    </div>
                </div>}

            </form>
        </div>
    )
}