import { useContext, useRef } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { addCollectionRequest } from "../../../../Utils/Requests/addCollection";
import modalStyles from "../../Utils/Styles/modal.module.scss";

interface IProps {
    setVisible: Function,
}

export default function CreateCollection(props: IProps) {
    const collectionNameRef = useRef<HTMLInputElement>(null);
    const { currentUser, updateUser } = useContext<any>(UserContext);

    async function submitHandler() {
        const collectionName = collectionNameRef.current?.value;
        const currentCollectionNameHolder: HTMLSpanElement | null = document.getElementById("current-collection");

        if (!currentCollectionNameHolder) return;

        if (!collectionName || collectionName.toLowerCase() === 'all') {
            return;
        }

        try {
            await addCollectionRequest(currentUser.id, collectionName);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }

        props.setVisible(false);
    }

    return <div className={modalStyles.backdrop}>
        <div className={modalStyles.modal}>
            <h1>Create a New Collection</h1>
            <form onSubmit={submitHandler}>
                <label>Collection Name</label>
                <input ref={collectionNameRef} />

                <button>Create</button>
                <button type="button" onClick={() => props.setVisible(false)}>Cancel</button>

            </form>

        </div>
    </div>
}