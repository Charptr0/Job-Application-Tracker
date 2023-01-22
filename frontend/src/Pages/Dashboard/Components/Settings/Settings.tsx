import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import { changeEmailRequest } from "../../../../Utils/Requests/changeEmail";
import { changePasswordRequest } from "../../../../Utils/Requests/changePassword";
import { changeUsernameRequest } from "../../../../Utils/Requests/changeUsername";
import { deleteUserRequest } from "../../../../Utils/Requests/deleteUser";
import styles from "./Settings.module.scss";

enum SettingTypes {
    NONE, EMAIL, USERNAME, PASSWORD, DELETE_ACCOUNT
}

interface IProps {
    hideSettings: Function,
}

export default function Settings(props: IProps) {
    const navigate = useNavigate();

    const { currentUser } = useContext<any>(UserContext);
    const settingOptionRef = useRef<HTMLSelectElement>(null);
    const [prevOption, setPrevOption] = useState("");
    const [settingMode, setSettingMode] = useState<SettingTypes>(SettingTypes.NONE);

    const [warningMessage, setWarningMessage] = useState<string>("");

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

        switch (currentSetting) {
            case SettingTypes.EMAIL:
                const newEmail = settingRef.emailRef.current?.value;

                if (newEmail === null || newEmail === undefined) return;
                if (newEmail === "") return setWarningMessage("This field cannot be empty");


                try {
                    await changeEmailRequest(currentUser.id, newEmail, currentPassword);
                    navigate("/");
                } catch (err) {
                    console.log(err);
                }

                return;
            case SettingTypes.USERNAME:
                const newUsername = settingRef.usernameRef.current?.value;
                if (newUsername === undefined || newUsername === null) return;
                if (newUsername === "") return setWarningMessage("This field cannot be empty");

                try {
                    await changeUsernameRequest(currentUser.id, newUsername, currentPassword);
                    navigate("/");
                } catch (err) {
                    console.log(err);
                }

                return;
            case SettingTypes.PASSWORD:
                const newPassword = settingRef.newPasswordRef.current?.value;
                const confirmPassword = settingRef.confirmPasswordRef.current?.value;

                if (newPassword === undefined || newPassword === null) return;
                if (confirmPassword === undefined || confirmPassword === null) return;
                if (newPassword === "" || confirmPassword === "") return setWarningMessage("One of these field is empty");
                if (newPassword.length < 8) return setWarningMessage("Password must be at least 8 characters");
                if (newPassword !== confirmPassword) return setWarningMessage("Password does not match");

                try {
                    await changePasswordRequest(currentUser.id, newPassword, currentPassword);
                    navigate("/");
                } catch (err) {
                    console.log(err);
                }

                return;
            case SettingTypes.DELETE_ACCOUNT:
                const confirmMessage = settingRef.deleteAccountRef.current?.value;

                if (confirmMessage === undefined || confirmMessage === null) return;
                if (confirmMessage !== currentUser.username) return setWarningMessage("Username does not match");

                try {
                    await deleteUserRequest(currentUser.id, currentPassword);
                    navigate("/");
                } catch (err) {
                    console.log(err);
                }

                return;
            default: return;
        }

    }

    return (
        <div>
            <form onSubmit={submitHandler} className={styles.settingContainer}>
                <h2>Settings</h2>
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
                            <input defaultValue={currentUser.email} ref={settingRef.emailRef} /><br></br>
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
                            <input ref={settingRef.deleteAccountRef} />
                        </div>
                        {warningMessage.length > 0 && <div className={styles.warningMessage}>{warningMessage}</div>}
                    </div>}

                </div>

                {settingMode !== SettingTypes.NONE && <div className={styles.confirmActionContainer}>
                    <label>Current Password:</label>
                    <input type="password" ref={settingRef.passwordRef} />

                    <div className={styles.btnContainer}>
                        <button type="button" onClick={() => props.hideSettings()}>Cancel</button>
                        <button>Perform Action</button>
                    </div>
                </div>}

            </form>
        </div>
    )
}