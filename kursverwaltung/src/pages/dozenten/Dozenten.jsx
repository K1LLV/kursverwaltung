import { useEffect, useState } from "react";
import axios from "axios";
import DescriptionRow from "../../components/DescriptionRow";
import AddButton from "../../UI/AddButton";
import styles from "./Dozenten.module.css"
import DozentRow from "./DozentRow";

const Dozenten = props => {

    const [dozenten, setDozenten] = useState([]);

    useEffect(() => {
        axios.get("https://alex.undefiniert.ch/dozenten")
            .then(r => {
                console.log(r.data.data);
                setDozenten(r.data.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const handleAdd = () => {

    };

    const results = dozenten.length > 0 
    ? dozenten.map(x => <DozentRow key={x.id_dozent} dozent={x}/>)
    : <p>Es gibt keine Dozenten zur Zeit!</p>

    return(
        <div>
            <div className={styles.title}>Dozenten</div>
            <div className={styles.results}>
                {results && <DescriptionRow a="ID" b="Dozent" c="E-Mail" styles={styles}/>}
                {results}
                <AddButton onAdd={handleAdd}/>
            </div>
        </div>
    );
};

export default Dozenten;