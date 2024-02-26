import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./EditKurs.module.css";
import KursForm from "./KursForm";

const EditKurs = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [kurs, setKurs] = useState(null);
    const [dozenten, setDozenten] = useState([]);

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/kurse/${params.id}`)
                .then(response => {
                    console.log(response.data.data[0]);
                    setKurs(response.data.data[0]);
                    setFormData(response.data.data[0]);
                })
                .catch(error => {
                     console.log(error);
                });
        axios.get('https://alex.undefiniert.ch/dozenten')
            .then(response => {
                setDozenten(response.data.data);
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
        axios.put(`https://alex.undefiniert.ch/kurse/${params.id}`, formData)
            .then(response => {
                navigate('/kurse');
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        console.log('Form submitted:', formData);
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

    return(
        <div className={styles.editKurs}>
            <div className={styles.title}>Edit Kurs</div>
            <KursForm 
                formData={formData}
                onInputChanged={handleChange}
                onSubmit={handleSubmit}
                dozentenOptions={dozentenOptions}/>
        </div>
    );
};

export default EditKurs;