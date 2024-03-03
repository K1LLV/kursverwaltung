import { useNavigate } from "react-router-dom";
import Row from "../../components/Row";
import styles from "./DozentRow.module.css"
import axios from "axios";

const DozentRow = props => {

    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.stopPropagation();
        axios.delete(`https://alex.undefiniert.ch/dozenten/${props.dozent.id_dozent}`)
            .then(() => {
                props.onUpdate();
            })
            .catch(e => console.log(e));
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/dozenten/${props.dozent.id_dozent}/edit`);
    };

    const handleClick = () => {
        navigate(`/dozenten/${props.dozent.id_dozent}`);
    };

    return <Row 
                a={props.dozent.id_dozent}
                b={`${props.dozent.vorname} ${props.dozent.nachname}`}
                c={props.dozent.email}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onClick={handleClick}
                styles={styles}
                />
};

export default DozentRow;