const Kontakt = props => {
    return(
        <div className={props.styles.contact}>
            <div className={props.styles.title}>Kontakt</div>
            <div className={props.styles.email}>Email: {props.lernende.email}</div>
            <div className={props.styles.emailPrivat}>Private Email: {props.lernende.email_privat}</div>
            <div className={props.styles.handy}>Handynummer: {props.lernende.handy}</div>
            <div className={props.styles.telefon}>Telefon: {props.lernende.telefon}</div>
        </div>
    );
};

export default Kontakt;