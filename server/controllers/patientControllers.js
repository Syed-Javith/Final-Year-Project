const Patient = require('../models/Patient')

const findPatientById = async (id) => {
    try {
        const patient = await Patient.findOne({ patient_id : id });
        console.log(patient);
        console.log(id);
        return patient;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {findPatientById}