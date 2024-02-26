import { useNavigate } from "react-router-dom";
import Row from "../../components/Row";
import styles from "./KursRow.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const KursRow = props => {
    const navigate = useNavigate();

    const [dozent, setDozent] = useState(null);

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/dozenten/${props.kurs.fk_id_dozent}`)
            .then(response => {
                setDozent(response.data.data[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const editHandler = () => navigate(`/kurse/${props.kurs.id_kurs}/edit`);;
    const deleteHandler = () => {};
    const handleOpenProfile = () => {};


    const dozentField = props.kurs.fk_id_dozent == 0 || !dozent
        ? "Kein Dozent"
        : `${dozent.vorname} ${dozent.nachname}`

    return <Row
            styles={styles}
            id={props.kurs.id_kurs}
            a={props.kurs.kursnummer}
            b={props.kurs.kursthema}
            c={dozentField}
            onEdit={editHandler}
            onDelete={deleteHandler}
            onClick={handleOpenProfile}/>
};

export default KursRow;