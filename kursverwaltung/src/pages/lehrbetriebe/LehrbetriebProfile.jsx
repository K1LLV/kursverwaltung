import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./LehrbetriebProfile.module.css";
import axios from "axios";
import LehrbetriebLernendeRow from "./lehrbetriebProfile/LehrbetriebLernendeRow";
import DescriptionRow from "../../components/DescriptionRow";
import { BASEURL } from "../../helpers/helpers";

const LehrbetriebProfile = () => {
    const params = useParams();
    const [lehrbetrieb, setLehrbetrieb] = useState(null);
    const [lehrbetriebeLernende, setLehrbetriebLernende] = useState([]);
    const [lernende, setLernende] = useState([]);

    useEffect(() => {
        const fetchLehrbetriebData = async () => {
            try {
                const [lehrbetriebResponse, lernendeResponse, lehrbetriebLernendeResponse] = await Promise.all([
                    axios.get(`${BASEURL}lehrbetriebe/${params.id}`),
                    axios.get(`${BASEURL}lernende`),
                    axios.get(`${BASEURL}lehrbetrieb_lernende`)
                ]);

                setLehrbetrieb(lehrbetriebResponse.data);
                setLernende(lernendeResponse.data);
                setLehrbetriebLernende(lehrbetriebLernendeResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLehrbetriebData();
    }, [params.id]);

    if (!lehrbetrieb || !lernende || !lehrbetriebeLernende) {
        return null;
    }

    const filteredLernende = lehrbetriebeLernende.filter(x =>
        x.fk_id_lehrbetrieb === lehrbetrieb.id_lehrbetrieb && (!x.ende || x.ende === "0000-00-00")
    );

    const actualLernende = filteredLernende.map(x => (
        <LehrbetriebLernendeRow
            key={x.id_lehrbetrieb_lernende}
            lernende={lernende.find(y => y.id_lernende === x.fk_id_lernende)}
            lehrbetriebLernende={x}
        />
    ));

    return (
        <div className={styles.page}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.firmaName}>{lehrbetrieb.firma}</div>
                </div>
                <div className={styles.a}>
                    <div className={styles.addresse}>
                        <div className={styles.addresseTitle}>Adresse</div>
                        <div className={styles.strasse}>{lehrbetrieb.strasse}</div>
                        <div className={styles.plzOrt}>{lehrbetrieb.plz}, {lehrbetrieb.ort}</div>
                    </div>

                    <div className={styles.lernende}>
                        <div className={styles.lernendeTitle}>Aktuelle Lernende</div>
                        <DescriptionRow a="Lernende" b="Beruf" c="Startdatum" styles={styles}/>
                        <div className={styles.lernendeResults}>
                            {actualLernende.length > 0 ? actualLernende : <p>No current learners.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LehrbetriebProfile;
