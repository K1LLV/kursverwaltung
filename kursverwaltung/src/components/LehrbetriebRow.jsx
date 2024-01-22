import { CiEdit } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import styles from './LehrbetriebRow.module.css';

const LehrbetriebRow = props => {
    return(
        <div className={styles.row}>
            <div className={styles.info}>
                <div className={styles.id}>{props.id}</div>
                <div className={styles.a}>
                    <div className={styles.firma}>{props.firma}</div>
                    <div className={styles.b}>
                        <div className={styles.strasse}>{props.strasse}</div>
                        <div className={styles.c}>
                            <div className={styles.plz}>{props.plz}</div>
                            <div className={styles.d}>
                                <div className={styles.ort}>{props.ort}</div>
                                <div className={styles.e}>
                                    <CiEdit className={styles.edit}/>
                                    <button className={styles.removeButton}>
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

export default LehrbetriebRow;