import styles from "./DozentForm.module.css";

const DozentForm = props => {
    const handleInputChanged = (e) => props.onInputChanged(e); 
    
    return(
        <form className={styles.form} onSubmit={props.onSubmit}>
                <label className={styles.lable}>
                    Vorname:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="vorname"
                        defaultValue={props.formData.vorname}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Nachname:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="nachname"
                        defaultValue={props.formData.nachname}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Strasse:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="strasse"
                        defaultValue={props.formData.strasse}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    PLZ:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="plz"
                        defaultValue={props.formData.plz}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Ort:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="ort"
                        defaultValue={props.formData.ort}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Land:
                    <br/>
                    <select className={styles.select} name="fk_id_land" value={props.formData.fk_id_land} onChange={handleInputChanged}>
                        <option value="0"></option>
                        {props.laenderOptions}
                    </select>
                </label>

                <label className={styles.lable}>
                    Geschlecht:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="geschlecht"
                        defaultValue={props.formData.geschlecht}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Telefon:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="telefon"
                        defaultValue={props.formData.telefon}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Handy:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="handy"
                        defaultValue={props.formData.handy}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Email:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="email"
                        defaultValue={props.formData.email}
                        onChange={handleInputChanged}/>
                </label>

                <label className={styles.lable}>
                    Geburtsdatum:
                    <br/>
                    <input
                        className={styles.input}
                        type="date"
                        name="geburtsdatum"
                        defaultValue={props.formData.geburtsdatum}
                        onChange={handleInputChanged}/>
                </label>


                <div className={styles.submitContainer}>
                    <button className={styles.submitButton} type="submit">Submit</button>
                </div>
        </form>
    );
}

export default DozentForm;