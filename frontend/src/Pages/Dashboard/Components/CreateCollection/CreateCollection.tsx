import { useContext, useRef } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { addCollectionRequest } from "../../../../Utils/Requests/addCollection";
import { setCollection } from "../../../../Utils/Storage/setCollection";
import modalStyles from "../../Utils/Styles/modal.module.scss";
import styles from "./CreateCollection.module.scss";

interface IProps {
    setVisible: Function,
}

export default function CreateCollection(props: IProps) {
    const collectionNameRef = useRef<HTMLInputElement>(null);
    const { currentUser, updateUser } = useContext<any>(UserContext);

    async function submitHandler() {
        const collectionName = collectionNameRef.current?.value;

        if (!collectionName || collectionName.toLowerCase() === 'all') {
            return;
        }

        try {
            await addCollectionRequest(currentUser.id, collectionName);
            setCollection(collectionName);
        } catch (err) {
            console.error(err);
        }

        props.setVisible(false);
    }

    return <div className={modalStyles.backdrop}>
        <div className={modalStyles.smallModal}>
            <h1>Create a New Collection</h1>
            <form onSubmit={submitHandler} className={styles.form}>
                <label>Enter a New Collection Name</label><br></br>
                <input ref={collectionNameRef} /> <br></br>

                <div className={styles.btnContainer}><br></br>
                    <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>
                    <button>Create</button>
                </div>
            </form>

        </div>
    </div>
}