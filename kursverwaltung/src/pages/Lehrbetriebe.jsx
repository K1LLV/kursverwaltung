
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Lehrbetriebe.module.css';
import LehrbetriebRow from '../components/LehrbetriebRow';

const Lehrbetriebe = props => {

    const [lehrbetriebe, setLehrbetriebe] = useState(null);

    useEffect(() => {
        axios.get('https://alex.undefiniert.ch/lehrbetriebe')
            .then(response => {
                console.log(response.data.data);
                setLehrbetriebe(response.data.data);
            })
            .catch(error => {
                 console.log(error);
            });
    }, []);

    const rows = lehrbetriebe
    ? lehrbetriebe.map(x =>
        <LehrbetriebRow
            key={x.id_lehrbetrieb}
            id={x.id_lehrbetrieb}
            firma={x.firma}
            ort={x.ort}
            plz={x.plz}
            strasse={x.strasse}
        />)
    : [];

    return(
        <div>
            <div className={styles.title}>Lehrbetriebe</div>
            <div className={styles.results}>
                {rows}
            </div>
        </div>
    );
};

export default Lehrbetriebe;