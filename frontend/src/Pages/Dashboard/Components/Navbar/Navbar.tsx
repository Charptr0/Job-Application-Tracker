import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import styles from "./Navbar.module.scss";

interface IProps {
    logoutHandler: Function,
    displaySettings: Function,
    hideSettings: Function,
}

export default function Navbar(props: IProps) {
    const { currentUser } = useContext<any>(UserContext);
    const [showUserOptions, setShowUserOptions] = useState(false);

    return <nav className={styles.navbar}>
        <h1 className={styles.title} onClick={() => props.hideSettings()}>Dashboard</h1>
        <div className={styles.user} onClick={() => setShowUserOptions(!showUserOptions)}>@{currentUser.username}</div>
        {showUserOptions && <div className={styles.userOptions}>
            <div onClick={() => { setShowUserOptions(false); props.displaySettings() }}>Settings</div>
            <div onClick={() => props.logoutHandler()}>Log Out</div>
        </div>}
    </nav>
}