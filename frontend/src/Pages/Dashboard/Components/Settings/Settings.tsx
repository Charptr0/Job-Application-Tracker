import { useContext, useReducer, useRef, useState } from "react"
import { UserContext } from "../../../../Context/UserContext";
import styles from "./Settings.module.scss";
import { deleteAccountHandler } from "./Utils/deleteAccountHandler";
import { emailHandler } from "./Utils/emailHandler";

enum SettingTypes {
    NONE, EMAIL, USERNAME, PASSWORD, DELETE_ACCOUNT
}

interface IProps {
    hideSettings: Function,
}

export default function Settings(props: IProps) {
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

        switch (currentSetting) {
            case SettingTypes.EMAIL:
                const newEmail = settingRef.emailRef.current?.value;
                if (!newEmail === null) return;
                if (newEmail === "") return setWarningMessage("This field cannot be empty");

                return;
            case SettingTypes.USERNAME: return emailHandler();
            case SettingTypes.PASSWORD:
                const newPassword = settingRef.passwordRef.current?.value;
                const confirmPassword = settingRef.confirmPasswordRef.current?.value;

                if (newPassword === null || confirmPassword === null) return;

                if (newPassword === "" || confirmPassword === "") return setWarningMessage("One of these field is empty");
                if (newPassword !== confirmPassword) return setWarningMessage("Password does not match");
                return;
            case SettingTypes.DELETE_ACCOUNT: return deleteAccountHandler("I Agree", currentUser.username);
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