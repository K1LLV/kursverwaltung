import { useState } from "react";
import Row from "../../../components/Row";
import styles from "./LehrbetriebLernendeRow.module.css";
import editStyles from "./LehrbetriebLernendeRowEdit.module.css";
import axios from "axios";
import Date from "../../../components/Date";

const LehrbetriebLernendeRow = props => {

    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState(
        {
            fk_id_lernende: props.id_lernende,
            beruf: props.lehrbetriebLernende.beruf,
            start: props.lehrbetriebLernende.start,
            ende: props.lehrbetriebLernende.ende,
        }
    );

    const handleEdit = () => setIsEdit(x => !x);
    const handleDelete = () => {
        axios.delete(`https://alex.undefiniert.ch/lehrbetrieb_lernende/${props.lehrbetriebLernende.id_lehrbetrieb_lernende}`)
            .then(() => {
                props.onUpdate();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://alex.undefiniert.ch/lehrbetrieb_lernende/${props.lehrbetriebLernende.id_lehrbetrieb_lernende}`, formData)
            .then(() => {
                setIsEdit(false);
                props.onUpdate();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setFormData(x => {
            return ({...x, [e.target.name]: e.target.value})
        });
    };

    const editForm = 
        <form onSubmit={handleSubmit}>
            <div className={styles.editForm}>
                <div className={styles.berufInput}>
                    <input
                    className={styles.berufInput}
                    name="beruf"
                    type="text"
                    defaultValue={formData.beruf}
                    onChange={handleChange}
                    />
                </div>
                
                <div className={styles.startInput}>
                    <input
                    className={styles.dateInput}
                    name="start"
                    type="date"
                    defaultValue={formData.start}
                    onChange={handleChange}/>
                </div>
            
                <div className={styles.endeInput}>
                    <input
                    className={styles.dateInput}
                    name="ende"
                    type="date"
                    defaultValue={formData.ende}
                    onChange={handleChange}/>
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>

    const row = isEdit
    ?   <Row
        a={props.lehrbetrieb.firma}
        b={editForm}
        styles={editStyles}
        onEdit={handleEdit}
        onDelete={handleDelete}/>
    :   <Row
        a={props.lehrbetrieb.firma}
        b={props.lehrbetriebLernende.beruf}
        c={<Date date={props.lehrbetriebLernende.start}/>}
        d={<Date date={props.lehrbetriebLernende.ende}/>}
        styles={styles}
        onEdit={handleEdit}
        onDelete={handleDelete}/>;

    return(row);
};

export default LehrbetriebLernendeRow;