import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './LehrbetriebRow.module.css';
import Row from "../../components/Row";
import { BASEURL } from "../../helpers/helpers";


const LehrbetriebRow = props => {

    const navigate = useNavigate();

    const deleteHandler = (e) => {
        e.stopPropagation();
        axios.delete(`${BASEURL}lehrbetriebe/${props.id}`)
            .then(response => {
                console.log(response.data);
                props.onRender();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const editHandler = (e) => {
        e.stopPropagation();
        navigate(`${props.id}/edit`);
    };

    const handleOpenProfile = () => navigate(`/lehrbetriebe/${props.id}`);;

    return(
        <Row
            styles={styles}
            id={props.id}
            a={props.firma}
            b={props.strasse}
            c={props.plz}
            d={props.ort}
            onEdit={editHandler}
            onDelete={deleteHandler}
            onClick={handleOpenProfile}/>
    );
};

export default LehrbetriebRow;