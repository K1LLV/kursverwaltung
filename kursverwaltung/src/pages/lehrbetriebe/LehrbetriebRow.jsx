import { CiEdit } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './LehrbetriebRow.module.css';
import Row from "../../components/Row";


const LehrbetriebRow = props => {

    const navigate = useNavigate();

    const deleteHandler = () => {
        axios.delete(`https://alex.undefiniert.ch/lehrbetriebe/${props.id}`)
            .then(response => {
                console.log(response.data.data);
                props.onRender();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const editHandler = () => {
        navigate(`${props.id}/edit`);
    };


    return(
        <Row 
            id={props.id}
            a={props.firma}
            b={props.strasse}
            c={props.plz}
            d={props.ort}
            onEdit={editHandler}
            onDelete={deleteHandler}/>
    );
};

export default LehrbetriebRow;