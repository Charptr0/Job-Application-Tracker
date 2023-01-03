import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import { removeCollectionRequest } from "../../../Utils/Requests/removeCollection";
import { setCollection } from "../../../Utils/Storage/setCollection";
import modalStyles from "../../Dashboard/Utils/Styles/modal.module.scss";

interface IProps {
    setVisible: Function,
}

export default function RemoveCollection(props: IProps) {
    const { currentUser, updateUser } = useContext<any>(UserContext);

    async function confirmRemoveHandler() {
        const collectionName = document.getElementById("current-collection")?.innerHTML;

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
        <div className={modalStyles.modal}>
            <h2>Are you sure</h2>
            <button onClick={confirmRemoveHandler}>Yes</button>
            <button>No</button>
        </div>
    </div>
}