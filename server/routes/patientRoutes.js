const express = require('express');
const { findPatientById } = require('../controllers/patientControllers');

const router = express.Router();

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    try {
        const data = await findPatientById(id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
