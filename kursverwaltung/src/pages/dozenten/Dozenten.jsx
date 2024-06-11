import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DescriptionRow from "../../components/DescriptionRow";
import AddButton from "../../UI/AddButton";
import styles from "./Dozenten.module.css"
import DozentRow from "./DozentRow";
import { BASEURL } from "../../helpers/helpers";

const Dozenten = props => {
    const navigate = useNavigate();

    const [dozenten, setDozenten] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        axios.get(`${BASEURL}dozenten`)
            .then(r => {
                console.log("ddd", r.data);
                setDozenten(r.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [isUpdate]);

    const handleAdd = () => {
        navigate("/dozenten/add");
    };

    const handleUpdate = () => setIsUpdate(x => !x);

    const results = dozenten.length > 0 
    ? dozenten.map(x => <DozentRow key={x.id_dozent} dozent={x} onUpdate={handleUpdate}/>)
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