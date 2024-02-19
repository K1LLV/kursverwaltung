const DescriptionRow = props => {
    const { styles } = props; // Destructure styles from props

    if (!styles) {
        // Handle the case when styles is not defined
        console.error("styles prop is not defined in DescriptionRow");
        return null; // Or provide a default styling or return something else
    }

    return (
        <div className={styles.descRow}>
            <div className={styles.descA}>
                {props.a}
                <div className={styles.descB}>
                    {props.b}
                    <div className={styles.descC}>
                        {props.c}
                        <div className={styles.descD}>
                            {props.d}
                            <div className={styles.descE}>
                                {props.e}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptionRow;