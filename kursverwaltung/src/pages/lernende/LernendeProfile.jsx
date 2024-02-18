import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Kontakt from "./LernendeProfile/Kontakt";
import axios from "axios";
import styles from './LernendeProfile.module.css';
import KurseRow from "./LernendeProfile/KurseRow";

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
                    <Kontakt styles={styles} lernende={lernende}/>
                    <div className={styles.kurseNoten}>
                        <div className={styles.title}>Kurse</div>
                        <div className={styles.kurseResultsContainer}>
                            <div className={styles.kurseResults}>
                                <KurseRow/>
                                <KurseRow/>
                                <KurseRow/>
                                <KurseRow/>
                                <KurseRow/>
                                <KurseRow/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.activities}>

                </div>
            </div>
        </div>
    );
}

export default LernendeProfile;