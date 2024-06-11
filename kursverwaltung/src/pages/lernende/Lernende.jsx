import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Lernende.module.css";
import DescriptionRow from "../../components/DescriptionRow";
import LernendeRow from "./LernendeRow";
import AddButton from "../../UI/AddButton";
import { BASEURL } from "../../helpers/helpers";

const Lernende = props => {
    const [shouldRender, setShouldRender] = useState(true);
    const [lernende, setLernende] = useState();
    const [betriebe, setBetriebe] = useState();
    const [lehrbetriebLernende, setLehrbetriebLernende] = useState();

    const navigate = useNavigate(); 

    const renderHandler = () => {
        setShouldRender((x) => !x);
    };

    const addHandler = () => {
        navigate('/lernende/add');
    };

    useEffect(() => {
        axios.get(`${BASEURL}lehrbetriebe`)
            .then(response => {
                setBetriebe(response.data);
            })
            .catch(error => {
                 console.log(error);
            });

        axios.get(`${BASEURL}lehrbetrieb_lernende`)
            .then(response => {
                console.log(response.data);
                setLehrbetriebLernende(response.data);
            })
            .catch(error => {
                 console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${BASEURL}lernende`)
            .then(response => {
                setLernende(response.data);
            })
            .catch(error => {
                 console.log(error);
            });
    }, [shouldRender]);

    const getBetrieb = (lernendeId) => {
        const found = lehrbetriebLernende ? lehrbetriebLernende.find(x => x.fk_id_lernende == lernendeId && (x.ende == "0000-00-00" || !x.ende)) : "";
        if (found) {
            const betrieb = betriebe ? betriebe.find(x => x.id_lehrbetrieb == found.fk_id_lehrbetrieb) : "";
            if(betrieb) {
                return betrieb.firma;
            }
        } 
        return "";
    };

    const getBeruf = (lernendeId) => {
        const found = lehrbetriebLernende ? lehrbetriebLernende.find(x => x.fk_id_lernende == lernendeId && (x.ende == "0000-00-00" || !x.ende)) : "";
        return found ? found.beruf : "";
    };

    const results = lernende
    ? lernende.map(x => (
        <LernendeRow
            key={x.id_lernende}
            id={x.id_lernende}
            vorname={x.vorname}
            nachname={x.nachname}
            beruf={getBeruf(x.id_lernende)}
            betrieb={getBetrieb(x.id_lernende)}
            onRender={renderHandler}
        />
    ))
    : [];

    return(
        <div>
            <div className={styles.title}>Lernende</div>
            <div className={styles.results}>
                {results && <DescriptionRow a="ID" b="Vorname" c="Nachname" d="Beruf" e="Betrieb" styles={styles}/>}
                {results}
                <AddButton onAdd={addHandler}/>
            </div>
        </div>
    );
};

export default Lernende;