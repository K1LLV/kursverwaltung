import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DozentProfil.module.css";
import axios from "axios";
import KursRow from "./profile/KursRow";
import { BASEURL } from "../../helpers/helpers";

const DozentProfil = () => {

    const params =  useParams();

    const [dozent, setDozent] = useState(null);
    const [kurse, setKurse] = useState([]);

    useEffect(() => {
        axios.get(`${BASEURL}dozenten/${params.id}`)
            .then(r =>{
                setDozent(r.data)
            })
            .catch(e => {
                console.error(e);
            })
    }, []);

    useEffect(() => {
        if(dozent){
            axios.get(`${BASEURL}kurse`)
                .then(r =>{
                    setKurse(r.data.filter(x => x.fk_id_dozent == dozent.id_dozent));
                })
                .catch(e => {
                    console.error(e);
                })
        }
    }, [dozent]);

    if(!dozent){
        return <></>
    }

    const kurseRows = kurse.map(x => <KursRow kurs={x}/>)

    console.log(dozent);
    return(
        <div className={styles.profileContainer}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.name}>
                        {dozent.vorname} {dozent.nachname}
                    </div>
                </div>
                <div className={styles.a}>
                    <div className={styles.kontakt}>
                        <div className={styles.title}>Kontakt</div>
                        <div className={styles.kontaktItem}>Email: {dozent.email}</div>
                        <div className={styles.kontaktItem}>Handy: {dozent.handy}</div>
                        <div className={styles.kontaktItem}>Telefon: {dozent.telefon}</div>
                    </div> 
                </div>
                
                <div className={styles.b}>
                    <div className={styles.kurse}>
                        <div className={styles.title}>Kurse</div>
                        <div className={styles.results}>
                            {kurseRows}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DozentProfil