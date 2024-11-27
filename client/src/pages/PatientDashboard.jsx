import React, { useEffect, useState } from 'react';
import { getPatientDetails } from '../apis/patientApis';

const PatientDetailsPage = ({ pId }) => {
    const [patient, setPatient] = useState(null);

    // Fetch patient details from the API
    const fetchPatientDetails = async () => {
        try {
            const patientData = await getPatientDetails(pId);
            setPatient(patientData);
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    useEffect(() => {
        fetchPatientDetails();
    }, [pId]);

    return patient ? (
        <div className="patient-details-container">
            <div style={{backgroundColor : "white" , margin : "10px" , padding : "5px" , borderRadius : "5px"}}>
            <h1 className="patient-title">Patient Details</h1>
            </div>
            <div className="patient-card">
                <div className="patient-info">
                    <p><strong>Patient ID:</strong> {patient.patient_id}</p>
                    <p><strong>Name:</strong> {patient.patient_name || 'N/A'}</p>
                    {/* <p><strong>Admission Location:</strong> {patient.admission_location || 'N/A'}</p>
                    <p><strong>Admission Type:</strong> {patient.admission_type_EMERGENCY ? 'Emergency' : patient.admission_type_URGENT ? 'Urgent' : 'Routine'}</p>
                    <p><strong>Admission Time:</strong> {patient.admittime || 'N/A'}</p>
                    <p><strong>Discharge Time:</strong> {patient.dischtime || 'N/A'}</p>
                    <p><strong>Discharge Location:</strong> {patient.discharge_location || 'N/A'}</p>
                    <p><strong>Ethnicity:</strong> {patient.ethnicity || 'N/A'}</p>
                    <p><strong>Religion:</strong> {patient.religion || 'N/A'}</p>
                    <p><strong>Marital Status:</strong> {patient.marital_status || 'N/A'}</p> */}
                    <p><strong>Diagnosis:</strong> {patient.diagnosis || 'N/A'}</p>
                    <p><strong>Diagnosis Count:</strong> {patient.diagnosis_count || 'N/A'}</p>
                    <p><strong>ICU Length of Stay:</strong> {patient.icu_los ? `${patient.icu_los} days` : 'N/A'}</p>
                    <p><strong>Insurance Type:</strong> {patient.insurance_Medicaid ? 'Medicaid' : patient.insurance_Medicare ? 'Medicare' : patient.insurance_Private ? 'Private' : 'None'}</p>
                    <p><strong>Glucose Level:</strong> {patient.glucose || 'N/A'}</p>
                    <p><strong>Hematocrit:</strong> {patient.hematocrit || 'N/A'}</p>
                    <p><strong>Hemoglobin:</strong> {patient.hemoglobin || 'N/A'}</p>
                </div>
            </div>
        </div>
    ) : (
        <div className="loading-container">
            <p>Loading patient details...</p>
        </div>
    );
};

export default PatientDetailsPage;
