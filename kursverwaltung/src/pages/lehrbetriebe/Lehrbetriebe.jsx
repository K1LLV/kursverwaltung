import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Lehrbetriebe.module.css';
import LehrbetriebRow from './LehrbetriebRow';
import DescriptionRow from '../../components/DescriptionRow';
import AddButton from '../../UI/AddButton';
import { BASEURL } from "../../helpers/helpers";

const Lehrbetriebe = props => {

    const [shouldRender, setShouldRender] = useState(true);
    const [lehrbetriebe, setLehrbetriebe] = useState(null);

    const navigate = useNavigate(); 

    const renderHandler = () => {
        setShouldRender((x) => !x);
    };

    const addHandler = () => {
        navigate('/lehrbetriebe/add');
    };

    useEffect(() => {
        axios.get(`${BASEURL}lehrbetriebe`)
            .then(response => {
                console.log(response.data);
                setLehrbetriebe(response.data);
            })
            .catch(error => {
                 console.log(error);
            });
    }, [shouldRender]);

    const rows = lehrbetriebe
    ? lehrbetriebe.map(x =>
        <LehrbetriebRow
            key={x.id_lehrbetrieb}
            id={x.id_lehrbetrieb}
            firma={x.firma}
            ort={x.ort}
            plz={x.plz}
            strasse={x.strasse}
            onRender={renderHandler}
        />)
    : [];

    console.log(styles);

    return(
        <div>
            <div className={styles.title}>Lehrbetriebe</div>
            <div className={styles.results}>
                <DescriptionRow a="ID" b="Firma" c="Strasse" d="PLZ" e="Ort" styles={styles}/>
                {rows}
                <AddButton onAdd={addHandler}/>
            </div>
        </div>
    );
};

export default Lehrbetriebe;