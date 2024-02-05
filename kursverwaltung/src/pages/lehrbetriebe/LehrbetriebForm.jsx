import styles from './LehrbetriebForm.module.css';

const LehrbetriebForm = props => {

    const handleChange = (e) => props.onInputChanged(e); 

    return(
        <form className={styles.form} onSubmit={props.onSubmit}>
                <label className={styles.lable}>
                    Firma:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="firma"
                        value={props.formData.firma}
                        onChange={handleChange}/>
                </label>

                <label className={styles.lable}>
                    Ort:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="ort"
                        value={props.formData.ort}
                        onChange={handleChange}/>
                </label>

                <label className={styles.lable}>
                    PLZ:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="plz"
                        value={props.formData.plz}
                        onChange={handleChange}/>
                </label>

                <label className={styles.lable}>
                    Strasse:
                    <br/>
                    <input
                        className={styles.input}
                        type="text"
                        name="strasse"
                        value={props.formData.strasse}
                        onChange={handleChange}/>
                </label>

                <div className={styles.submitContainer}><button className={styles.submitButton} type="submit">Submit</button></div>
        </form>
    );
}

export default LehrbetriebForm;