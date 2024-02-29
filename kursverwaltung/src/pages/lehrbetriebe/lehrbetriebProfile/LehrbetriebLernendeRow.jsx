import styles from "./LehrbetriebLernendeRow.module.css";
import Row from "../../../components/Row";
import Date from "../../../components/Date";
import { useNavigate } from "react-router-dom";

const LehrbetriebLernendeRow = props => {

    const navigate = useNavigate();

    const handleEdit = () => {

    };

    const handleDelete = () => {

    };

    const handleClick = () => {
        navigate(`/lernende/${props.lernende.id_lernende}`);
    } 

    return <Row
            a={`${props.lernende.vorname} ${props.lernende.nachname}`}
            b={props.lehrbetriebLernende.beruf}
            c={<Date date={props.lehrbetriebLernende.start}/>}
            onClick={handleClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            styles={styles}
            />
}

export default LehrbetriebLernendeRow;