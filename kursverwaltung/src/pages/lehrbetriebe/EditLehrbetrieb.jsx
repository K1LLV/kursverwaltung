import LehrbetriebForm from "./LehrbetriebForm";
import axios from "axios";
import styles from './EditLehrbetrieb.module.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditLehrbetrieb = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            firma: '',
            ort: '',
            plz: '',
            strasse: '',
        }
    );

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/lehrbetriebe/${params.id}`)
            .then(response => {
                console.log(response.data.data[0]);
                setFormData(response.data.data[0]);
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
        axios.put(`https://alex.undefiniert.ch/lehrbetriebe/${params.id}`, formData)
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
        <div className={styles.editLehrbetrieb}>
            <div className={styles.title}>Edit Lehrbetrieb</div>
            <LehrbetriebForm
                onSubmit={handleSubmit}
                onInputChanged={handleChange}
                formData={formData}/>
        </div>
    );
};

export default EditLehrbetrieb;