import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Lehrbetriebe.module.css';
import LehrbetriebRow from './LehrbetriebRow';
import DescriptionRow from '../../components/DescriptionRow';
import AddButton from '../../UI/AddButton';

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
        axios.get('https://alex.undefiniert.ch/lehrbetriebe')
            .then(response => {
                console.log(response.data.data);
                setLehrbetriebe(response.data.data);
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

    return(
        <div>
            <div className={styles.title}>Lehrbetriebe</div>
            <div>
                
            </div>
            <div className={styles.results}>
                <DescriptionRow a="Firma" b="Strasse" c="PLZ" d="Ort"/>
                {rows}
                <AddButton onAdd={addHandler}/>
            </div>
        </div>
    );
};

export default Lehrbetriebe;