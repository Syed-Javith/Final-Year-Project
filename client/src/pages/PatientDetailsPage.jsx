import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatientDetails } from '../apis/patientApis';

const PatientDetailsPage = () => {
    const params = useParams();
    const [patient, setPatient] = useState(null);
    const [id, setId] = useState(params.id);

    const fetchPatientDetails = async () => {
        try {
            console.log(id);
            const patient = await getPatientDetails(id);
            setPatient(patient);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPatientDetails();
    }, [id]);

    if(patient){
    return (
        <div>
            <h1>Patient Details</h1>
            <p>{patient.id}</p>
            <p>{patient.data}</p>
        </div>
    );
    }
    return <></>;
};

export default PatientDetailsPage;