import styles from './LernendeRow.module.css';
import { useNavigate } from 'react-router-dom';
import Row from '../../components/Row';

const LernendeRow = props => {

    const navigate = useNavigate();

    const deleteHandler = () => {
        axios.delete(`https://alex.undefiniert.ch/lernende/${props.id}`)
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
            a={props.vorname}
            b={props.nachname}
            c={props.beruf}
            d={props.betrieb}
            onEdit={editHandler}
            onDelete={deleteHandler}/>
    );
};

export default LernendeRow;