import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './AddLernende.module.css';
import LernendeForm from "./LernendeForm";

const AddLernende = props => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            vorname: '',
            nachname: '',
            plz: '',
            strasse: '',
            ort: '',
            fk_id_land: 0,
            geschlecht: '',
            telefon: '',
            handy: '',
            email: '',
            email_privat: '',
            geburtsdatum: '',
        }
    );

    const [laender, setLaender] = useState(null);

    useEffect(() => {
        axios.get('https://alex.undefiniert.ch/laender')
            .then(response => {
                setLaender(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((x) => {
            return ({...x, [name]: value});
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://alex.undefiniert.ch/lernende', formData)
            .then(response => {
                console.log(response.data);
                navigate('/lernende');
            })
            .catch(error => {
                console.log(error);
            });
        console.log('Form submitted:', formData);
    };

    const laenderOptions = laender
    ? laender.map(x => 
        <option key={x.id_land} value={x.id_land}>
            {x.land}
        </option>)
    : [];

    return(
        <div className={styles.addLernende}>
            <div className={styles.title}>Add Lernende</div>
            <LernendeForm 
                formData={formData}
                onInputChanged={handleChange}
                onSubmit={handleSubmit}
                laenderOptions={laenderOptions}/>
        </div>
    );    
};

export default AddLernende;