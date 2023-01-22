import { useContext, useRef, useState } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { addCollectionRequest } from "../../../../Utils/Requests/addCollection";
import { fetchAllCollectionsRequest } from "../../../../Utils/Requests/fetchAllCollections";
import { setCollection } from "../../../../Utils/Storage/setCollection";
import modalStyles from "../../Utils/Styles/modal.module.scss";
import styles from "./CreateCollection.module.scss";

interface IProps {
    setVisible: Function,
}

export default function CreateCollection(props: IProps) {
    const collectionNameRef = useRef<HTMLInputElement>(null);
    const { currentUser } = useContext<any>(UserContext);

    const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");


    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const collectionName = collectionNameRef.current?.value;

        if (!collectionName) {
            setWarningMessage("This field cannot be empty");
            return;
        }

        if (collectionName.toLowerCase() === 'all') {
            setWarningMessage(`The new collection name cannot be named ${collectionName}`);
            return;
        }

        setDisableSubmitButton(true);

        try {
            const allCollections: string[] = await fetchAllCollectionsRequest(currentUser.id);

            // make sure that the new collection does not exist already
            for (const userCollectionName of allCollections) {

                if (userCollectionName === collectionName) {
                    setWarningMessage("This collection already exists");
                    setDisableSubmitButton(false);
                    return;
                }
            }

            // make request to create new collection
            await addCollectionRequest(currentUser.id, collectionName);
            setCollection(collectionName);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }

        setDisableSubmitButton(false);
        props.setVisible(false);
    }

    return <div className={modalStyles.backdrop}>
        <div className={modalStyles.smallModal}>
            <div className={styles.title}>Create a New Collection</div>
            <form onSubmit={submitHandler} className={styles.form}>
                <label>New Collection Name</label><br></br>
                <input ref={collectionNameRef} /> <br></br>
                {warningMessage.length > 0 && <div className={styles.warningMessage}>{warningMessage}</div>}

                <div className={styles.btnContainer}><br></br>
                    <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>
                    <button disabled={disableSubmitButton}>Create</button>
                </div>
            </form>

        </div>
    </div>
}