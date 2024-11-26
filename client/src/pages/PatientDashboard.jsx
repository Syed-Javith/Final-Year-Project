import React, { useEffect, useState } from 'react';
import { getPatientDetails } from '../apis/patientApis';

const PatientDetailsPage = ({ pId }) => {
    const [patient, setPatient] = useState(null);

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
            <div className="patient-card">
                <h1 className="patient-title">Patient Details</h1>
                <div className="patient-info">
                    <p><strong>ID:</strong> {patient.id}</p>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Contact:</strong> {patient.contact}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                    <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
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