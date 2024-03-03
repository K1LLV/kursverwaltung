import { useNavigate } from "react-router-dom";
import DescriptionRow from "../../../components/DescriptionRow";
import styles from "./KursRow.module.css"

const KursRow = props => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/kurse/${props.kurs.id_kurs}`);
    }

    return <DescriptionRow 
        a={props.kurs.kursnummer}
        b={props.kurs.kursthema}
        styles={styles}
        onClick={handleClick}/>
}

export default KursRow;