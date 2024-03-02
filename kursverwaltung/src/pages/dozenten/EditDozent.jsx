import { useState, useEffect } from "react";
import DozentForm from "./DozentForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditDozent = props => {
    const params = useParams();

    const [formData, setFormData] = useState(null);
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
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((x) => {
            return ({...x, [name]: value});
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://alex.undefiniert.ch/dozenten/${params.id}`, formData)
            .then(response => {
                navigate('/dozenten');
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        console.log('Form submitted:', formData);
    };

    const laenderOptions = laender.current
    ? laender.map(x => 
        <option key={x.id_land} value={x.id_land}>
            {x.land}
        </option>)
    : [];

    return(
        <div className={styles.editLernende}>
            <div className={styles.title}>Edit Lernende</div>
            <DozentForm 
                formData={formData}
                onInputChanged={handleChange}
                onSubmit={handleSubmit}
                laenderOptions={laenderOptions}/>
        </div>
    );
}

export default EditDozent;