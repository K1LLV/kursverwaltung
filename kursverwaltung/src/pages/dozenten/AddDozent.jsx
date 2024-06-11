import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './AddDozent.module.css'
import axios from 'axios';
import DozentForm from "./DozentForm";
import { BASEURL } from "../../helpers/helpers";

const AddDozent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            vorname: '',
            nachname: '',
            plz: '',
            strasse: '',
            ort: '',
            fk_id_land: '0',
            geschlecht: '',
            telefon: '',
            handy: '',
            email: '',
            geburtsdatum: '',
        }
    );

    const [laender, setLaender] = useState(null);

    useEffect(() => {
        axios.get(`${BASEURL}laender`)
            .then(response => {
                setLaender(response.data);
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
        axios.post(`${BASEURL}dozenten`, formData)
            .then(response => {
                console.log(response.data);
                navigate('/dozenten');
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
            <div className={styles.title}>Add Dozent</div>
            <DozentForm 
                formData={formData}
                onInputChanged={handleChange}
                onSubmit={handleSubmit}
                laenderOptions={laenderOptions}/>
        </div>
    );    
};



export default AddDozent;