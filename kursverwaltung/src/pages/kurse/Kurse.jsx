import DescriptionRow from "../../components/DescriptionRow";
import AddButton from "../../UI/AddButton";
import axios from "axios";
import styles from "./Kurse.module.css";
import { useEffect, useState } from "react";
import KursRow from "./KursRow";

const Kurse = props => {
    const [kurse, setKurse] = useState([]);
    const [dozenten, setDozenten] = useState([]);

    useEffect(() => {
        axios.get('https://alex.undefiniert.ch/kurse')
            .then(response => {
                setKurse(response.data.data);
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

    const addHandler = () => {};

    const results = kurse.length > 0 
    ? kurse.map(x => <KursRow key={x.id_kurs} kurs={x}/>)
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