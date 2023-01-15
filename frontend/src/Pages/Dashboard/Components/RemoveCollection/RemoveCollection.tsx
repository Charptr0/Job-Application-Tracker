import { useContext } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { removeCollectionRequest } from "../../../../Utils/Requests/removeCollection";
import { setCollection } from "../../../../Utils/Storage/setCollection";
import modalStyles from "../../../Dashboard/Utils/Styles/modal.module.scss";
import styles from "./RemoveCollection.module.scss";

interface IProps {
    setVisible: Function,
}

export default function RemoveCollection(props: IProps) {
    const { currentUser, updateUser } = useContext<any>(UserContext);

    async function confirmRemoveHandler() {
        const collectionName = document.getElementById("current-collection")?.textContent;

        if (!collectionName) return;

        try {
            await removeCollectionRequest(currentUser.id, collectionName);
            setCollection("All");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }

        props.setVisible(false);
    }


    return <div className={modalStyles.backdrop}>
        <div className={modalStyles.smallModal}>
            <h2 className={styles.title}>Are you sure?</h2>

            <div className={styles.btnContainer}>
                <button onClick={() => props.setVisible(false)} className={modalStyles.btn}>No</button>
                <button onClick={confirmRemoveHandler} className={modalStyles.btn}>Yes</button>
            </div>
        </div>
    </div>
}