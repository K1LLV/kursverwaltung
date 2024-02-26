import styles from './LernendeRow.module.css';
import { useNavigate } from 'react-router-dom';
import Row from '../../components/Row';
import axios from 'axios';

const LernendeRow = props => {

    const navigate = useNavigate();

    const deleteHandler = (e) => {
        e.stopPropagation();

        axios.delete(`https://alex.undefiniert.ch/lernende/${props.id}`)
            .then(response => {
                console.log(response.data.data);
                props.onRender();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleOpenProfile = () => navigate(`/lernende/${props.id}`);;

    const editHandler = (e) => {
        e.stopPropagation();
        navigate(`${props.id}/edit`);
    };

    return(
        <Row
            styles={styles}
            id={props.id}
            a={props.vorname}
            b={props.nachname}
            c={props.beruf}
            d={props.betrieb}
            onEdit={editHandler}
            onDelete={deleteHandler}
            onClick={handleOpenProfile}/>
    );
};

export default LernendeRow;