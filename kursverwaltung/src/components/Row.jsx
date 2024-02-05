import { CiEdit } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import styles from "./Row.module.css";

const Row = props => {
    return(
        <div className={styles.row}>
            <div className={styles.info}>
                <div className={styles.id}>{props.id}</div>
                <div className={styles.a}>
                    <div className={styles.firma}>{props.a}</div>
                    <div className={styles.b}>
                        <div className={styles.strasse}>{props.b}</div>
                        <div className={styles.c}>
                            <div>{props.c}</div>
                            <div className={styles.d}>
                                <div className={styles.ort}>{props.d}</div>
                                <div className={styles.e}>
                                    <button className={styles.editButton} onClick={props.onEdit}>
                                        <CiEdit className={styles.edit}/>
                                    </button>
                                    <button className={styles.removeButton} onClick={props.onDelete}>
                                        <CiSquareRemove className={styles.remove}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Row;