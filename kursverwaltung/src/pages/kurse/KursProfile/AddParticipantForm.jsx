import { useState } from 'react';
import styles from './AddParticipantForm.module.css';
import axios from 'axios';
import { BASEURL } from "../../../helpers/helpers";

const AddParticipantForm = props => {

    const [formData, setFormData] = useState(
        {
            fk_id_kurs: props.kurs,
            fk_id_lernende: props.lernende[0].id_lernende,
            note: 0
        }
    );
    
    const lernendeOptions = props.lernende
    ? props.lernende.map(x => 
        <option key={x.id_lernende} value={x.id_lernende}>
            {`${x.vorname} ${x.nachname}`}
        </option>)
    : [];

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setFormData((x) => {
            return ({...x, [name]: value});
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BASEURL}kurse_lernende`, formData)
                .then(() => {
                    console.log(formData);
                    props.onUpdate();
                    props.onCancel();
                })
                .catch(error => {
                    console.log(formData);
                    console.log(error);
                });

    }

    const handelCancel = () => {
        props.onCancel();
    }

    return (
        <form className={styles.participantForm} onSubmit={handleSubmit}>
            Lernende:
            <div>
                <select className={styles.select} name="fk_id_lernende" onChange={handleChange}>
                    {lernendeOptions}
                </select>
            </div>
            
            <div className={styles.buttons}>
                <button type="submit">Submit</button>
                <button onClick={handelCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default AddParticipantForm;