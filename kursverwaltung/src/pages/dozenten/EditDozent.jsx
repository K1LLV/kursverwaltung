import { useState, useEffect } from "react";
import DozentForm from "./DozentForm";
import axios from "axios";
import styles from "./EditDozent.module.css"
import { useNavigate, useParams } from "react-router-dom";

const EditDozent = props => {
    const params = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
        geburtsdatum: '',
    });
    const [laender, setLaender] = useState([]);

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/dozenten/${params.id}`)
            .then(r => setFormData(r.data.data[0]))
            .catch(e => console.log(e));

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
        setFormData((prevFormData) => {
            return {...prevFormData, [name]: value};
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://alex.undefiniert.ch/dozenten/${params.id}`, formData)
            .then(response => {
                console.log(formData);
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

    console.log(formData);

    return(
        <div className={styles.editDozent}>
            <div className={styles.title}>Edit Dozent</div>
            <DozentForm 
                formData={formData}
                onInputChanged={handleChange}
                onSubmit={handleSubmit}
                laenderOptions={laenderOptions}/>
        </div>
    );
}

export default EditDozent;