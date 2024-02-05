import { CiEdit } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import styles from './LehrbetriebRow.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LehrbetriebRow = props => {

    const navigate = useNavigate();

    const deleteHandler = () => {
        axios.delete(`https://alex.undefiniert.ch/lehrbetriebe/${props.id}`)
            .then(response => {
                console.log(response.data.data);
                props.onRender();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const editHandler = () => {
        navigate(`${props.id}/edit`);
    };


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
                                    <button className={styles.editButton} onClick={editHandler}>
                                        <CiEdit className={styles.edit}/>
                                    </button>
                                    <button className={styles.removeButton} onClick={deleteHandler}>
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