import { useState } from 'react';
import styles from './AddLehrbetriebForm.module.css';
import axios from 'axios';
import { BASEURL } from "../../../helpers/helpers";

const AddLehrbetriebForm = props => {

    const [formData, setFormData] = useState(
        {
            fk_id_lehrbetrieb: props.lehrbetriebe[0].id_lehrbetrieb,
            fk_id_lernende: props.id_lernende,
            beruf: "",
            start: "",
            ende: "",
        }
    );

    console.log(props.lehrbetriebe);

    const betriebeOptions = props.lehrbetriebe
    ? props.lehrbetriebe.map(x => 
        <option key={x.id_lehrbetrieb} value={x.id_lehrbetrieb}>
            {x.firma}
        </option>)
    : [];

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setFormData((x) => {
            return ({...x, [name]: value});
        });
    }

    console.log("formData:", formData)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.start == "")
        {
            setFormData((x) => {
                return ({...x, ["start"]: null});
            });
        }
        if(formData.ende == "")
        {
            setFormData((x) => {
                return ({...x, ["ende"]: null});
            });
        }
        axios.post(`${BASEURL}lehrbetrieb_lernende`, formData)
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
            Lehrbetrieb:
            <div>
                <select className={styles.select} name="fk_id_lehrbetrieb" onChange={handleChange}>
                    {betriebeOptions}
                </select>
            </div>

            Beruf:    
            <div>
                <input
                    className={styles.beruf}
                    name="beruf"
                    type="text"
                    defaultValue={formData.beruf}
                    onChange={handleChange}/>
            </div>

            <div>
                    Start:
                    <input
                        className={styles.date}
                        type="date"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}/>
            </div>

            <div>
                    Ende:
                    <input
                        className={styles.date}
                        type="date"
                        name="ende"
                        value={formData.ende}
                        onChange={handleChange}/>
            </div>
            
            <div className={styles.buttons}>
                <button type="submit">Submit</button>
                <button onClick={handelCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default AddLehrbetriebForm;