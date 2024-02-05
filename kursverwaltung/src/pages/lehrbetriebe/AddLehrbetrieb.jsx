import { useState } from 'react';
import axios from 'axios';
import LehrbetriebForm from './LehrbetriebForm';
import styles from './AddLehrbetrieb.module.css/';
import { useNavigate } from 'react-router-dom';

const AddLehrbetrieb = (props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firma: '',
        ort: '',
        plz: '',
        strasse: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((x) => {
            return ({...x, [name]: value});
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://alex.undefiniert.ch/lehrbetriebe', formData)
            .then(response => {
                console.log(response.data);
                navigate('/lehrbetriebe');
            })
            .catch(error => {
                console.log(error);
            });
        console.log('Form submitted:', formData);
    };

    return(
        <div className={styles.addLehrbetrieb}>
            <div className={styles.title}>Add Lehrbetrieb</div>
            <LehrbetriebForm
                onSubmit={handleSubmit}
                onInputChanged={handleChange}
                formData={formData}/>
        </div>
    );
};

export default AddLehrbetrieb;