const DescriptionRow = props => {
    const { styles } = props;

    const handleClick = () => {
        props.onClick();
    }

    return (
        <div className={styles.descRow} onClick={handleClick}>
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