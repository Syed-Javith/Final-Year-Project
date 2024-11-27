const mongoose = require('mongoose');

// Define the patient schema
const patientSchema = mongoose.Schema({
    patient_name : String,
    patient_id: Number,
    hadm_id: Number,
    admittime: Date,
    dischtime: Date,
    deathtime: Date,
    admission_location: String,
    discharge_location: String,
    language: String,
    religion: String,
    marital_status: String,
    ethnicity: String,
    edregtime: Date,
    edouttime: Date,
    diagnosis: String,
    hospital_expire_flag: Boolean,
    has_chartevents_data: Boolean,
    next_admittime: Date,
    readmission: Boolean,
    icu_los: Number,
    diagnosis_count: Number,
    glucose: Number,
    hematocrit: Number,
    hemoglobin: Number,
    admission_type_EMERGENCY: Boolean,
    admission_type_URGENT: Boolean,
    insurance_Medicaid: Boolean,
    insurance_Medicare: Boolean,
    insurance_Private: Boolean,
});

// Create the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
