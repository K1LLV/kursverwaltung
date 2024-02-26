import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./LehrbetriebProfile.module.css";
import axios from "axios";

const LehrbetriebProfile = props => {
    const params = useParams();

    const [lehrbetrieb, setLehrbetrieb] = useState(null);
    const [lehrbetriebeLernende, setLehrbetriebLernende] = useState([]);
    const [lehrbetriebeLernendeIncludingThis, setLehrbetriebLernendeIncludingThis] = useState([]);
    const [lernende, setLernende] = useState([]);
    const [lernendeOfBetrieb, setLernendeOfBetrieb] = useState([]);

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/lehrbetriebe/${params.id}`)
            .then(response => {
                setLehrbetrieb(response.data.data[0]);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`https://alex.undefiniert.ch/lernende`)
            .then(response => {
                setLernende(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`https://alex.undefiniert.ch/lehrbetrieb_lernende`)
            .then(response => {
                setLehrbetriebLernende(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if(lehrbetrieb)
        {
            setLehrbetriebLernendeIncludingThis(lehrbetriebeLernende.filter(x => x.fk_id_lehrbetrieb == lehrbetrieb.id_lehrbetrieb));
        }
    }, [lehrbetrieb, lernende, lehrbetriebeLernende]);


    useEffect(() => {
        setLernendeOfBetrieb(lehrbetriebeLernendeIncludingThis.filter(x => x.ende == null).map(x => 
            lernende.find(y => y.id_lernende === x.fk_id_lernende)));
    }, []);

    if(!lehrbetrieb) {
        return <></>;
    }

    console.log(lehrbetriebeLernendeIncludingThis);

    return(
        <div className={styles.page}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.firmaName}>{lehrbetrieb.firma}</div>
                </div>
                <div className={styles.a}>
                    <div className={styles.addresse}>
                        <div className={styles.addresseTitle}>Addresse</div>
                        <div className={styles.strasse}>{lehrbetrieb.strasse}</div>
                        <div className={styles.plzOrt}>{lehrbetrieb.plz}, {lehrbetrieb.ort}</div>
                    </div>

                    <div className={styles.lernende}>
                        <div className={styles.lernendeTitle}>Aktuelle Lernende</div>
                        <div className={styles.lernendeResults}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LehrbetriebProfile;