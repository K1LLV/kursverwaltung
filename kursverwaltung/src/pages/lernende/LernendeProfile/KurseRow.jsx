import { useRef, useState } from "react";
import Row from "../../../components/Row";
import styles from './KurseRow.module.css';
import axios from "axios";

const KurseRow = props => {
    const [editNote, setEditNote] = useState(false); 

    const handleEdit = () => {
        setEditNote(true);
    };

    const handelCancelEdit = () => setEditNote(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.note.value);
        axios.put(`https://alex.undefiniert.ch/kurse_lernende/${props.kursLernende.id_kurs_lernende}`,
            {note: e.target.note.value})
                .then(() => {
                    setEditNote(false);
                    props.onUpdate();
                })
                .catch(error => {
                    console.log(error);
                });
    };

    const handleDelete = () => {
        axios.delete(`https://alex.undefiniert.ch/kurse_lernende/${props.kursLernende.id_kurs_lernende}`)
            .then(() => {
                setTimeout(() => {
                    console.log("Hello, World!");
                }, 7000);
                  
                props.onUpdate();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const noteView = !editNote 
    ? props.kursLernende.note
    : <form onSubmit={handleSubmit}>
        <input
        className={styles.note}
        name="note"
        type="number"
        min="1"
        max="6"
        step="0.1"
        defaultValue={props.kursLernende.note}/>
        <div className={styles.buttons}>
            <button type="submit">Submit</button>
            <button onClick={handelCancelEdit}>Cancel</button>
        </div>
    </form>
        
    return(
        <Row
            a={props.kurs.kursnummer}
            b={props.kurs.kursthema}
            c={noteView}
            styles={styles}
            onEdit={handleEdit}
            onDelete={handleDelete}/>
    );
};

export default KurseRow;