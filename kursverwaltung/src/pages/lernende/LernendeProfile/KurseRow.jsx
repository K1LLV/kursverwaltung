import Row from "../../../components/Row";
import styles from './KurseRow.module.css';

const KurseRow = props => {
    return(
        <Row
            a="M299"
            b="Inhalt"
            c="6"
            styles={styles}/>
    );
};

export default KurseRow;