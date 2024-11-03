const mongoose = require('mongoose');

const patientScehma = mongoose.Schema({
    id : Number,
    data : String
});

const Patient = mongoose.model('Patient',patientScehma);

module.exports = Patient;