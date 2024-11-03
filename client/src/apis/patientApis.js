import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'

const getPatientDetails = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/patient/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export { getPatientDetails }