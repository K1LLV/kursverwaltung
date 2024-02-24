import Row from "../../../components/Row";
import styles from "./LehrbetriebLernendeRow.module.css";

const LehrbetriebLernendeRow = props => {

    console.log(props.lehrbetrieb.firma);

    const handleEdit = () => {};
    const handleDelete = () => {};

    return(
        <Row
            a={props.lehrbetrieb.firma}
            b={props.lehrbetriebLernende.beruf}
            c={props.lehrbetriebLernende.start}
            d={props.lehrbetriebLernende.ende}
            styles={styles}
            onEdit={handleEdit}
            onDelete={handleDelete}/>
    );
};

export default LehrbetriebLernendeRow;