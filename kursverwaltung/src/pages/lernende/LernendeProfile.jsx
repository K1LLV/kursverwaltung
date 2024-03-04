import { useState, useEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Kontakt from "./LernendeProfile/Kontakt";
import axios from "axios";
import styles from './LernendeProfile.module.css';
import KurseRow from "./LernendeProfile/KurseRow";
import DescriptionRow from "../../components/DescriptionRow";
import AddButton from "../../UI/AddButton";
import AddKursNoteForm from "./LernendeProfile/AddKursNoteForm";
import LehrbetriebLernendeRow from "./LernendeProfile/LehrbetriebLernendeRow";
import AddLehrbetriebForm from "./LernendeProfile/AddLehrbetriebForm";

const LernendeProfile = porps => {
    const navigate = useNavigate();
    const params = useParams();

    const [lernende, setLernende] = useState(null);
    const [kurse, setKurse] = useState(null);
    const [kurseLernende, setKurseLernende] = useState(null);
    const [lehrbetriebe, setLehrbetriebe] = useState([]);
    const [lehrbetriebLernende, setLehrbetriebLernende] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isAddKursNote, setIsAddKursNote] = useState(false);
    const [isAddLehrbetrieb, setIsAddLehrbetrieb] = useState(false);

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

        axios.get('https://alex.undefiniert.ch/lehrbetriebe')
            .then(response => {
                setLehrbetriebe(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
        
        axios.get('https://alex.undefiniert.ch/lehrbetrieb_lernende')
            .then(response => {
                setLehrbetriebLernende(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, [isUpdate]);

    if (!lernende || !kurse || !kurseLernende || !lehrbetriebe) {
        return <></>;
    }

    const handleUpdate = () => setIsUpdate(x => !x);

    const handleAddKursNote = () => setIsAddKursNote(true);

    const handleCancelAddKursNote = () => setIsAddKursNote(false);

    const handleAddLehrbetrieb = () => setIsAddLehrbetrieb(true);

    const handleCancelAddLehrbetrieb = () => setIsAddLehrbetrieb(false);

    const kurseLernendeWithLernende = kurseLernende.filter(x => x.fk_id_lernende === lernende.id_lernende);
    const kurseOfLernende = kurseLernendeWithLernende.map(kursLernende =>
        kurse.find(kurs => kurs.id_kurs === kursLernende.fk_id_kurs)).filter(kurs => kurs !== undefined);
    const kurseWithoutLernende = kurse.filter(x => kurseLernendeWithLernende.every(y => y.fk_id_kurs !== x.id_kurs));
    const lehrbetriebLernendeWithLernende = lehrbetriebLernende.filter(x => x.fk_id_lernende === lernende.id_lernende);

    const addKursNote = kurse.length === 0
    ? <p>Es gibt keine Kurse zur Zeit!</p>
    : kurseWithoutLernende.length === 0
        ? <p>Der Lernende hat schon eine Note bei allen Kursen!</p>
        : <AddKursNoteForm 
            kurse={kurseWithoutLernende}
            id_lernende={lernende.id_lernende}
            onCancel={handleCancelAddKursNote}
            onUpdate={handleUpdate}/>;
    
    console.log("kurseOfLernende:", kurseOfLernende);
    console.log("kurseLernendeWithLernende:", kurseLernendeWithLernende);

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
                                {   
                                    kurseOfLernende.length > 0
                                        ? kurseOfLernende.map(x => {
                                            const kursLernende = kurseLernendeWithLernende.find(y => y.fk_id_kurs == x.id_kurs);
                                            return  <KurseRow 
                                                    key={x.id_kurs}
                                                    kurs={x}
                                                    kursLernende={kursLernende}
                                                    onUpdate={handleUpdate}/>;
                                               
                                        })
                                        : "Keine Kurse"
                                }
                            </div>
                        </div>
                        {isAddKursNote && addKursNote}
                        <div className={styles.addContainer}><AddButton onAdd={handleAddKursNote}/></div>
                    </div>
                </div>
                <div className={styles.b}>
                    <div className={styles.lehrbetriebe}>
                        <div className={styles.title}>Lehrbetriebe</div>
                        {
                            lehrbetriebLernendeWithLernende.length > 0
                            ? <>
                                <DescriptionRow a="Firma" b="Beruf" c="Start" d="Ende" styles={styles}/>
                                <div className={styles.lehrbetriebeResults}>
                                    {
                                        lehrbetriebLernendeWithLernende.map(x =>{
                                            return <LehrbetriebLernendeRow
                                                    key={x.id_lehrbetrieb_lernende}
                                                    lehrbetrieb={lehrbetriebe.find(y => x.fk_id_lehrbetrieb == y.id_lehrbetrieb)}
                                                    lehrbetriebLernende={x}
                                                    onUpdate={handleUpdate}/>;
                                        })
                                    }
                                </div>
                            </>
                            : <p>In keinem Lehrbetrieb!</p>
                        }

                        {isAddLehrbetrieb && <AddLehrbetriebForm lehrbetriebe={lehrbetriebe} id_lernende={lernende.id_lernende} onCancel={handleCancelAddLehrbetrieb} onUpdate={handleUpdate}/>}
                        
                        <AddButton onAdd={handleAddLehrbetrieb}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LernendeProfile;