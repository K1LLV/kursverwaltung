import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./KursProfile.module.css";
import Date from "../../components/Date";
import Participant from "./KursProfile/Participant";

const KursProfile = props => {
    const params = useParams();
    const [kurs, setKurs] = useState(null);
    const [kurseLernende, setKurseLernende] = useState([]);
    const [dozent, setDozent] = useState(null);

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/kurse/${params.id}`)
            .then(response => {
                setKurs(response.data.data[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [params.id]); // Include params.id in the dependency array

    useEffect(() => {
        if (kurs) {
            axios.get(`https://alex.undefiniert.ch/dozenten/${kurs.fk_id_dozent}`)
                .then(response => {
                    setDozent(response.data.data[0]);
                })
                .catch(error => {
                    console.log(error);
                });

            axios.get('https://alex.undefiniert.ch/kurse_lernende')
                .then(response => {
                    setKurseLernende(response.data.data.filter(x => x.fk_id_kurs == kurs.id_kurs));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [kurs]); // Include kurs in the dependency array

    if (!kurs) {
        return <></>;
    }

    const participants = kurseLernende.map(x => <Participant/>);

    return (
        <div className={styles.page}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.pageTitle}>
                        {kurs.kursnummer}: {kurs.kursthema}
                    </div>
                </div>
                <div className={styles.info}>
                    {kurs.start && <div className={styles.date}>Startdatum: <Date date={kurs.start}/></div>}
                    {kurs.ende && <div className={styles.date}>Enddatum: <Date date={kurs.ende}/></div>}
                    {dozent != null && <div className={styles.dozentInfo}>Dozent: {dozent.vorname} {dozent.nachname}</div>}
                </div>
            </div>
        </div>
    );
};

export default KursProfile;
