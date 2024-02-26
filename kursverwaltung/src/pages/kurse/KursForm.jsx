import styles from "./KursForm.module.css";

const KursForm = props => {

    const handleInputChanged = (e) => props.onInputChanged(e); 

    console.log(props.dozentenOptions);

    return(
        <form className={styles.form} onSubmit={props.onSubmit}>
                <label className={styles.lable}>
                    Kursnummer:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="kursnummer"
                        value={props.formData.kursnummer}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Kursthema:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="kursthema"
                        value={props.formData.kursthema}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Inhalt
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="inhalt"
                        value={props.formData.inhalt}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Dozent:
                    <br/>
                    <select className={styles.select} name="fk_id_dozent" value={props.formData.fk_id_dozent} onChange={handleInputChanged}>
                        <option value="0"></option>
                        {props.dozentenOptions}
                    </select>
                </label>
                
                <label className={styles.lable}>
                    Start:
                    <br/>
                    <input
                        className={styles.input}
                        type="date"
                        name="start"
                        value={props.formData.start}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Ende:
                    <br/>
                    <input
                        className={styles.input}
                        type="date"
                        name="ende"
                        value={props.formData.ende}
                        onChange={handleInputChanged}/>
                </label>

                <div className={styles.submitContainer}>
                    <button className={styles.submitButton} type="submit">Submit</button>
                </div>
        </form>
    );
};

export default KursForm;