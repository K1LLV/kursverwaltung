import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./KursProfile.module.css";
import Date from "../../components/Date";
import Participant from "./KursProfile/Participant";
import DescriptionRow from "../../components/DescriptionRow";
import AddButton from "../../UI/AddButton"
import AddParticipantForm from "./KursProfile/AddParticipantForm";
import { BASEURL } from "../../helpers/helpers";

const KursProfile = props => {
    const params = useParams();
    const [kurs, setKurs] = useState(null);
    const [kurseLernende, setKurseLernende] = useState([]);
    const [dozent, setDozent] = useState(null);
    const [lernende, setLernende] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        axios.get(`${BASEURL}kurse/${params.id}`)
            .then(response => {
                setKurs(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [params.id]); // Include params.id in the dependency array

    useEffect(() => {
        if (kurs) {
            if(kurs.fk_id_dozent != 0)
            {
                axios.get(`${BASEURL}dozenten/${kurs.fk_id_dozent}`)
                    .then(response => {
                        setDozent(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            axios.get(`${BASEURL}kurse_lernende`)
                .then(response => {
                    setKurseLernende(response.data.filter(x => x.fk_id_kurs == kurs.id_kurs));
                })
                .catch(error => {
                    console.log(error);
                });

            axios.get(`${BASEURL}lernende`)
                .then(response => {
                    setLernende(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [kurs, isUpdate]);

    if (!kurs) {
        return <></>;
    }

    const handleUpdate = () => {setIsUpdate(x => !x)}

    const handleAddParticipant = () => {
        setIsAdd(true);
    };

    const handleCancelAdd = () => {
        setIsAdd(false);
    }

    const participants = kurseLernende
        .map(x => lernende.find(y => y.id_lernende == x.fk_id_lernende))
        .filter(x => x != undefined)
        .map(x => <Participant key={x.id_lernende} participant={x} kurseLernende={kurseLernende} onUpdate={handleUpdate}/>);

    const notParticipants = lernende.filter(x => {
        return kurseLernende.every(y => y.fk_id_lernende !== x.id_lernende);
    });

    console.log(lernende);
    console.log(kurseLernende);
    console.log(notParticipants);

    const addform = notParticipants.length > 0
        ? <div><AddParticipantForm kurs={kurs.id_kurs} lernende={notParticipants} onUpdate={handleUpdate} onCancel={handleCancelAdd}/></div>
        : <div className={styles.message}>Alle lernende sind dabei!</div>

    return (
        <div className={styles.page}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.pageTitle}>
                        {kurs.kursnummer}: {kurs.kursthema}
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.dates}>
                        {kurs.start != "0000-00-00" && <div className={styles.date}>Startdatum: <Date date={kurs.start}/></div>}
                        {kurs.ende != "0000-00-00" && <div className={styles.date}>Enddatum: <Date date={kurs.ende}/></div>}
                    </div>
                    {dozent != null && <div className={styles.dozentInfo}>Dozent: {dozent.vorname} {dozent.nachname}</div>}
                    { kurs.inhalt && <div className={styles.inhaltContainer}>
                        <p>Inhalt: {kurs.inhalt}</p>
                    </div>}
                </div>

                <div className={styles.participants}>
                    <div className={styles.title}>Teilnehmer</div>
                    <div className={styles.participantsResults}>
                        {participants.length > 0 && <DescriptionRow a="Lernende" b="Note" styles={styles}/>}
                        {participants.length > 0
                            ? participants
                            : <div className={styles.message}>Zur Zeit gibt es keine Lernende, die bei diesem Kurs teilnehmen.</div>}
                    </div>
                    {
                        isAdd && addform
                    }
                    <AddButton onAdd={handleAddParticipant}/>
                </div>

            </div>
        </div>
    );
};

export default KursProfile;
