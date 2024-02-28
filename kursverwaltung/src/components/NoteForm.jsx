const NoteForm = props => {
    return(
        <form onSubmit={props.onSubmit}>
            <input
            className={props.styles.noteFormInput}
            name="note"
            type="number"
            min="1"
            max="6"
            step="0.1"
            defaultValue={props.note}/>
            <div className={props.styles.noteFormButtons}>
                <button type="submit">Submit</button>
                <button onClick={props.onCancelEdit}>Cancel</button>
            </div>
        </form>
    );
};

export default NoteForm;