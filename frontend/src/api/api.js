export const fetchPropertiesData = async (start_date, end_date) => {     
    console.log(process.env.REACT_APP_API_URL);
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/date-range?start_date=${start_date}&end_date=${end_date}`);
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error.message, "error");
    }
}