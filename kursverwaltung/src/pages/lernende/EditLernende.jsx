import { useState, useRef, useEffect } from "react";
import LernendeForm from "./LernendeForm";
import { useParams, useNavigate } from "react-router-dom";
import styles from './EditLernende.module.css';
import axios from "axios";

const EditLernende = props => {
    const params = useParams();
    const navigate = useNavigate();

    const [lernendeId, setLernendeId] = useState(null);
    const [betriebId, setBetriebId] = useState(0);
    const [betriebe, setBetriebe] = useState(null);
    const [lehrbetriebLernende, setLehrbetriebLernende] = useState(null);
    const [formData, setFormData] = useState(
        {
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
            email_privat: '',
            geburtsdatum: '',
        }
    );

    const laender = useRef(null);

    const formatDate = date => {
        const [datePart, _] = date.split(' ');
        return datePart;
    }

    useEffect(() => {
        axios.get(`https://alex.undefiniert.ch/lernende/${params.id}`)
            .then(response => {
                const lernende = response.data.data[0];
                setLernendeId(lernende.id_lernende);
                lernende.geburtsdatum = formatDate(lernende.geburtsdatum);
                setFormData(lernende);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('https://alex.undefiniert.ch/laender')
            .then(response => {
                laender.current = response.data.data;
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('https://alex.undefiniert.ch/lehrbetriebe')
            .then(response => {
                setBetriebe(response.data.data);
            })
            .catch(error => {
                 console.log(error);
            });

        axios.get('https://alex.undefiniert.ch/lehrbetrieb_lernende')
            .then(response => {
                setLehrbetriebLernende(response.data.data);
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

    const handleBetriebChanged = e => {
        setBetriebId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://alex.undefiniert.ch/lernende/${params.id}`, formData)
            .then(response => {
                navigate('/lernende');
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        console.log('Form submitted:', formData);
    };

    const betriebeOptions = betriebe
    ? betriebe.map(x => 
        <option key={x.id_lehrbetrieb} value={x.id_lehrbetrieb}>
            {x.firma}
        </option>)
    : [];

    const laenderOptions = laender.current
    ? laender.current.map(x => 
        <option key={x.id_land} value={x.id_land}>
            {x.land}
        </option>)
    : [];

    useEffect(() => {
        const lehrbetriebLernendeWithLernendeId = lehrbetriebLernende ? lehrbetriebLernende.find(x => x.fk_id_lernende == lernendeId) : "";
        if (lehrbetriebLernendeWithLernendeId) {
            const betrieb = betriebe ? betriebe.find(x => x.id_lehrbetrieb == lehrbetriebLernendeWithLernendeId.fk_id_lehrbetrieb) : "";
            if(betrieb) {
                setBetriebId(betrieb.id_lehrbetrieb);
            }
        } 
    }, [lehrbetriebLernende, lernendeId, betriebe]);

    return(
        <div className={styles.editLernende}>
            <div className={styles.title}>Edit Lernende</div>
            <LernendeForm 
                formData={formData}
                onInputChanged={handleChange}
                onSubmit={handleSubmit}
                laenderOptions={laenderOptions}/>
        </div>
    );
};

export default EditLernende;