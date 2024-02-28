import { useRef, useState } from "react";
import Row from "../../../components/Row";
import NoteForm from "../../../components/NoteForm";
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
                setEditNote(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const noteView = !editNote 
    ? props.kursLernende.note != 0 ? props.kursLernende.note : "Keine Note"
    : <NoteForm note={props.kursLernende.note} onSubmit={handleSubmit} onCancelEdit={handelCancelEdit} styles={styles}/> 

        
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