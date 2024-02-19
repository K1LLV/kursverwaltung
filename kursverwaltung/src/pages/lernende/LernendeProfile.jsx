import { useState, useEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Kontakt from "./LernendeProfile/Kontakt";
import axios from "axios";
import styles from './LernendeProfile.module.css';
import KurseRow from "./LernendeProfile/KurseRow";
import DescriptionRow from "../../components/DescriptionRow";
import AddButton from "../../UI/AddButton";
import AddKursNoteForm from "./LernendeProfile/AddKursNoteForm";

const LernendeProfile = porps => {
    const navigate = useNavigate();
    const params = useParams();

    const [lernende, setLernende] = useState(null);
    const [kurse, setKurse] = useState(null);
    const [kurseLernende, setKurseLernende] = useState(null);
    const [kurseOfLernende, setKurseOfLernende] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isAddKursNote, setIsAddKursNote] = useState(false);
    const kurseLernendeWithLernende = useRef([]);
    const kurseWithoutLernende = useRef([]);

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/lernende/${params.id}`)
            .then(response => {
                setLernende(response.data.data[0]);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('https://alex.undefiniert.ch/kurse')
            .then(response => {
                setKurse(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('https://alex.undefiniert.ch/kurse_lernende')
            .then(response => {
                setKurseLernende(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [params.id, isUpdate]);

    useEffect(() => {
        if (lernende && kurseLernende && kurse) {
            kurseLernendeWithLernende.current = kurseLernende.filter(x => x.fk_id_lernende === lernende.id_lernende);
            kurseWithoutLernende.current = kurse.filter(x =>
                kurseLernendeWithLernende.current.every(y => y.fk_id_kurs !== x.id_kurs)
            );
            const lernendesKurse = kurseLernendeWithLernende.current.map(x => kurse.find(y => y.id_kurs === x.fk_id_kurs)).filter(x => x !== undefined);
            setKurseOfLernende(lernendesKurse);
        }
    }, [kurseLernende, kurse, lernende, isUpdate]);

    if (!lernende || !kurse) {
        return <></>;
    }

    const handleUpdate = () => setIsUpdate(x => !x);

    const handleAddKursNote = () => setIsAddKursNote(true);
    const handleCancelAddKursNote = () => setIsAddKursNote(false);
    console.log(kurseWithoutLernende.current);

    return(
        <div key="profilePage" className={styles.profileContainer}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.name}>
                        {lernende.vorname} {lernende.nachname}
                    </div>
                </div>
                <div className={styles.a}>
                    <Kontakt styles={styles} lernende={lernende}/>
                    <div className={styles.kurseNoten}>
                        <div className={styles.title}>Kurse und Noten</div>
                        <DescriptionRow a="Kursnummer" b="Kursthema" c="Note" styles={styles}/>
                        <div className={styles.kurseResultsContainer}>
                            <div className={styles.kurseResults}>
                                {kurseOfLernende.length > 0
                                    ? kurseOfLernende.map(x => {
                                        const kursLernende = kurseLernendeWithLernende.current.find(y => y.fk_id_kurs == x.id_kurs);
                                        return <KurseRow 
                                            key={x.id_kurs}
                                            kurs={x}
                                            kursLernende={kursLernende}
                                            onUpdate={handleUpdate}/>
                                    })
                                    : "Keine Kurse"
                                }
                            </div>
                        </div>
                        {isAddKursNote && <AddKursNoteForm 
                            kurse={kurseWithoutLernende.current}
                            id_lernende={lernende.id_lernende}
                            onCancel={handleCancelAddKursNote}
                            onUpdate={handleUpdate}/>}
                        <div className={styles.addContainer}><AddButton onAdd={handleAddKursNote}/></div>
                    </div>
                </div>
                <div className={styles.activities}>

                </div>
            </div>
        </div>
    );
}

export default LernendeProfile;