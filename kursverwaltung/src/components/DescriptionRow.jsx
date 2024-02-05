import styles from './DescriptionRow.module.css';

const DescriptionRow = props => {
    return(
        <div className={styles.row}>
                <div className={styles.info}>
                    ID
                    <div className={styles.a}>
                        {props.a}
                        <div className={styles.b}>
                            {props.b}
                            <div className={styles.c}>
                                {props.c}
                                <div className={styles.d}>
                                    {props.d}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default DescriptionRow;