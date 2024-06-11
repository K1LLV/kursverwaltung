import { useRef, useState } from "react";
import Row from "../../../components/Row";
import NoteForm from "../../../components/NoteForm";
import styles from './KurseRow.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../../helpers/helpers";

const KurseRow = props => {
    const navigate = useNavigate();

    const [editNote, setEditNote] = useState(false); 

    const handleEdit = (e) => {
        e.stopPropagation();
        setEditNote(true);
    };

    const handelCancelEdit = (e) => {
        e.stopPropagation();
        setEditNote(false);
    }
    const handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.target.note.value);
        axios.put(`${BASEURL}kurse_lernende/${props.kursLernende.id_kurs_lernende}`,
            {note: e.target.note.value})
                .then(() => {
                    setEditNote(false);
                    props.onUpdate();
                })
                .catch(error => {
                    console.log(error);
                });
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        axios.delete(`${BASEURL}kurse_lernende/${props.kursLernende.id_kurs_lernende}`)
            .then(() => {
                props.onUpdate();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleClick = () => {
        navigate(`/kurse/${props.kursLernende.fk_id_kurs}`);
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
            onDelete={handleDelete}
            onClick={handleClick}/>
    );
};

export default KurseRow;