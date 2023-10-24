// export const fetchPropertiesData = async ({start = '2023-01-02', end = '2023-12-03'}) => {
export const fetchPropertiesData = async (start_date, end_date) => { 
    console.log(`http://localhost:3001/api/date-range?start_date=${start_date}&end_date=${end_date}`);
    try {
        const res = await fetch(`http://localhost:3001/api/date-range?start_date=${start_date}&end_date=${end_date}`);
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error.message, "error");
    }
}