const express = require('express');

const csv = require('csv-parser');
const fs = require('fs');

const router = express.Router();
const multer = require('multer');
const Patient = require('../models/Patient');
const User = require('../models/User');

const upload = multer({ dest: 'uploads/' });

function parseDate(dateString) {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date; // Return null for invalid dates
}

function parseNumber(value) {
    const number = Number(value);
    return isNaN(number) ? null : number; // Return null for invalid numbers
}


router.post('/csv',upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const dataArray = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        const newUser = new User({
            username : row.username,
            password: "123456",
            role : "patient",
          });
      
        await newUser.save();

        const patient = new Patient({
            patient_name : row.username,
            patient_id: Number(row.patient_id),
            hadm_id: Number(row.hadm_id),
                    admittime: parseDate(row.admittime),
                    dischtime: parseDate(row.dischtime),
                    deathtime: parseDate(row.deathtime),
                    admission_location: row.admission_location || null,
                    discharge_location: row.discharge_location || null,
                    language: row.language || null,
                    religion: row.religion || null,
                    marital_status: row.marital_status || null,
                    ethnicity: row.ethnicity || null,
                    edregtime: parseDate(row.edregtime),
                    edouttime: parseDate(row.edouttime), // Fixed date parsing
                    diagnosis: row.diagnosis || null,
                    hospital_expire_flag: row.hospital_expire_flag === '1',
                    has_chartevents_data: row.has_chartevents_data === '1',
                    next_admittime: parseDate(row.next_admittime),
                    readmission: row.readmission === '1',
                    icu_los: parseNumber(row.icu_los),
                    diagnosis_count: parseNumber(row.diagnosis_count),
                    glucose: parseNumber(row.glucose),
                    hematocrit: parseNumber(row.hematocrit),
                    hemoglobin: parseNumber(row.hemoglobin),
                    admission_type_EMERGENCY: row.admission_type_EMERGENCY === '1',
                    admission_type_URGENT: row.admission_type_URGENT === '1',
                    insurance_Medicaid: row.insurance_Medicaid === '1',
                    insurance_Medicare: row.insurance_Medicare === '1',
                    insurance_Private: row.insurance_Private === '1',
        });

        await patient.save();
      })
      .on('end', async () => {
        try {
          res.status(200).send({ message: 'CSV data successfully imported to MongoDB' });
  
          // Remove the uploaded file
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('Error inserting data:', err);
          res.status(500).send({ message: 'Failed to insert data into MongoDB' });
        }
      })
      .on('error', (err) => {
        console.error('Error reading CSV:', err);
        res.status(500).send({ message: 'Failed to process CSV file' });
      });
})


module.exports = router;