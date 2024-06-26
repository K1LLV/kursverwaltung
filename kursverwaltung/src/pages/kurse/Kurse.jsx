import DescriptionRow from "../../components/DescriptionRow";
import AddButton from "../../UI/AddButton";
import axios from "axios";
import styles from "./Kurse.module.css";
import { useEffect, useState } from "react";
import KursRow from "./KursRow";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../helpers/helpers";

const Kurse = props => {
    const navigate = useNavigate();
    const [kurse, setKurse] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        axios.get(`${BASEURL}kurse`)
            .then(response => {
                setKurse(response.data);
            })
            .catch(error => {
                    console.log(error);
            });
    }, [isUpdate]);

    const addHandler = () => {navigate("/kurse/add")};
    const handleUpdate = () => {setIsUpdate(x => !x)};

    const results = kurse.length > 0 
    ? kurse.map(x => <KursRow key={x.id_kurs} kurs={x} onUpdate={handleUpdate}/>)
    : kurse;

    console.log(kurse);

    return(
        <div>
            <div className={styles.title}>Kurse</div>
            <div className={styles.results}>
                <DescriptionRow a="ID" b="Kursnummer" c="Kursthema" d="Dozent" styles={styles}/>
                {results}
                <AddButton onAdd={addHandler}/>
            </div>
        </div>
    );
};

export default Kurse;