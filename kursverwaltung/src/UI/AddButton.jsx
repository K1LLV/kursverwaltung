import { CiCirclePlus } from "react-icons/ci";
import styles from './AddButton.module.css';

const AddButton = (props) => {
    return (
        <button className={styles.addButton} onClick={props.onAdd}>
            <CiCirclePlus className={styles.add}/>
        </button>
    );
}

export default AddButton;