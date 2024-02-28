import { useState } from "react";
import NoteForm from "../../../components/NoteForm";
import Row from "../../../components/Row";
import styles from "./Participant.module.css";
import axios from "axios";

const Participant = props => {

    const [isEdit, setIsEdit] = useState(false);
    const kursLernende = props.kurseLernende.find(x => x.fk_id_lernende == props.participant.id_lernende);

    const handleEditNote = () => {setIsEdit(true)};
    const handleDelete = (e) => {
        axios.delete(
            `https://alex.undefiniert.ch/kurse_lernende/${kursLernende.id_kurs_lernende}`)
            .then(r => {
                console.log("r",r);
                props.onUpdate();
            })
            .catch(e => {console.log(e)});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(
            `https://alex.undefiniert.ch/kurse_lernende/${kursLernende.id_kurs_lernende}`,
            {note: e.target.note.value})
            .then(r => {
                console.log("r",r);
                setIsEdit(false);
                props.onUpdate();
            })
            .catch(e => {console.log(e)});

    }

    const handleCancelEdit = () => {
        setIsEdit(false);
    }

    return <Row 
        a={`${props.participant.vorname} ${props.participant.nachname}`}
        b={isEdit ? <NoteForm note={kursLernende.note} styles={styles} onSubmit={handleSubmit} onCancelEdit={handleCancelEdit}/> : kursLernende.note != 0 ? kursLernende.note : "Keine Note"}
        styles={styles}
        onEdit={handleEditNote}
        onDelete={handleDelete}/>
}

export default Participant;