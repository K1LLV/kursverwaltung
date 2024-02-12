import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from './LernendeProfile.module.css';

const LernendeProfile = porps => {
    const navigate = useNavigate();
    const params = useParams();

    const [lernende, setLernende] = useState(null);

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/lernende/${params.id}`)
            .then(response => {
                setLernende(response.data.data[0]);
                console.log(lernende);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    
    if(!lernende) {
        return(<></>);
    }

    return(
        <div key="profilePage" className={styles.profileContainer}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.name}>
                        {lernende.vorname} {lernende.nachname}
                    </div>
                </div>

                <div className={styles.a}>
                    <div className={styles.contact}>
                        <div className={styles.contactTitle}>Kontakt</div>
                        <div className={styles.email}>Email: {lernende.email}</div>
                        <div className={styles.emailPrivat}>Private Email: {lernende.email_privat}</div>
                        <div className={styles.handy}>Handynummer: {lernende.handy}</div>
                        <div className={styles.telefon}>Telefon: {lernende.telefon}</div>
                    </div>
                </div>


                <div className={styles.kurseNoten}>

                </div>
                <div className={styles.activities}>

                </div>
            </div>
        </div>
    );
}

export default LernendeProfile;