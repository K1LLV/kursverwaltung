import { useState } from 'react';
import styles from './AddKursNoteForm.module.css';
import axios from 'axios';

const AddKursNoteForm = props => {

    const [formData, setFormData] = useState(
        {
            fk_id_kurs: props.kurse[0].id_kurs,
            fk_id_lernende: props.id_lernende,
            note: 1
        }
    );

    console.log(props.kurse);

    const kurseOptions = props.kurse
    ? props.kurse.map(x => 
        <option key={x.id_kurs} value={x.id_kurs}>
            {x.kursnummer}
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
        axios.post('https://alex.undefiniert.ch/kurse_lernende', formData)
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
        <form className={styles.kurseForm} onSubmit={handleSubmit}>
            <div>
                <select className={styles.select} name="fk_id_kurs" onChange={handleChange}>
                    {kurseOptions}
                </select>
            </div>
                
            <div>
                <input
                    className={styles.note}
                    name="note"
                    type="number"
                    min="1"
                    max="6"
                    step="0.1"
                    defaultValue={formData.note}
                    onChange={handleChange}/>
            </div>
            

            <div className={styles.buttons}>
                <button type="submit">Submit</button>
                <button onClick={handelCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default AddKursNoteForm;