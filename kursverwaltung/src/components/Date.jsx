const Date = props => {
    const months = {
        "01": "Januar",
        "02": "Februar",
        "03": "März",
        "04": "April",
        "05": "Mai",
        "06": "Juni",
        "07": "Juli",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "Dezember",
    };

    const [year, month, day] = props.date.split("-");

    return `${day}. ${months[month]} ${year}`
};

export default Date;