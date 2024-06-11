import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddKurs.module.css";
import KursForm from "./KursForm";
import { BASEURL } from "../../helpers/helpers";

const AddKurs = () => {
    const navigate = useNavigate();

    const [dozenten, setDozenten] = useState([]);
    const [formData, setFormData] = useState(
        {
            dauer:"4",
            kursnummer: "",
            kursthema: "",
            inhalt: "",
            start: "",
            ende: "",
            fk_id_dozent: "0",
        }
    );

    useEffect(() => {
        axios.get(`${BASEURL}dozenten`)
            .then(response => {
                setDozenten(response.data);
            })
            .catch(error => {
                    console.log(error);
            });
    }, []);

    const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        const {name, value} = e.target;
        setFormData((x) => {
            return ({...x, [name]: value});
        });
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        axios.post(`${BASEURL}kurse`, formData)
            .then(response => {
                navigate('/kurse');
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    };


    const dozentenOptions = dozenten.length > 0
    ? dozenten.map(x => 
        <option key={x.id_dozent} value={x.id_dozent}>
            {x.vorname} {x.nachname}
        </option>)
    : [];

    if(!formData){
        return(<></>);
    }

    console.log(formData);

    return(
        <div className={styles.addKurs}>
            <div className={styles.title}>Add Kurs</div>
            <KursForm 
                formData={formData}
                onInputChanged={handleChange}
                onSubmit={handleSubmit}
                dozentenOptions={dozentenOptions}/>
        </div>
    );
};

export default AddKurs;