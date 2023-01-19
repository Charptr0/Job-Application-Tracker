import { useContext, useRef, useState } from "react"
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


    function changeSettingOptionHandler() {
        const option = settingOptionRef.current?.value;

        if (option === undefined || prevOption === option) return;

        setPrevOption(option);

        switch (option) {
            case "change my email": return setSettingMode(SettingTypes.EMAIL);
            case "change my username": return setSettingMode(SettingTypes.USERNAME);
            case "change my password": return setSettingMode(SettingTypes.PASSWORD);
            case "delete my account": return setSettingMode(SettingTypes.DELETE_ACCOUNT);
            default: return setSettingMode(SettingTypes.NONE);
        }
    }

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const currentSetting = settingMode;

        switch (currentSetting) {
            case SettingTypes.EMAIL: return emailHandler();
            case SettingTypes.USERNAME: return emailHandler();
            case SettingTypes.PASSWORD: return emailHandler();
            case SettingTypes.DELETE_ACCOUNT: return deleteAccountHandler("I Agree");
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
                    {settingMode === SettingTypes.EMAIL && <div className={styles.innerContainer}>
                        <label>New Email: </label>
                        <input defaultValue={currentUser.email} />
                    </div>}

                    {settingMode === SettingTypes.USERNAME && <div className={styles.innerContainer}>
                        <label>New Username: </label>
                        <input defaultValue={currentUser.username} />
                    </div>}

                    {settingMode === SettingTypes.PASSWORD && <div className={`${styles.innerContainer} ${styles.flexCol}`}>
                        <label>New Password: </label>
                        <input type="password" /><br></br>

                        <label>Confirm New Password: </label>
                        <input type="password" />

                    </div>}

                    {settingMode === SettingTypes.DELETE_ACCOUNT && <div className={`${styles.innerContainer} ${styles.flexCol}`}>
                        <label>Enter <span style={{ "color": "green" }}>I Agree</span> to confirm this action </label>
                        <input />
                    </div>}

                </div>

                {settingMode !== SettingTypes.NONE && <div className={styles.confirmActionContainer}>
                    <label>Current Password:</label>
                    <input type="password" />

                    <div className={styles.btnContainer}>
                        <button type="button" onClick={() => props.hideSettings()}>Cancel</button>
                        <button>Perform Action</button>
                    </div>
                </div>}

            </form>
        </div>
    )
}