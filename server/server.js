const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connecToMongoDB } = require('./utils/db')
const app = express();
const patientRouter = require('./routes/patientRoutes')

app.use(cors())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.json())
connecToMongoDB();

app.get("/",(req,res) => {
    console.log("Hello");
});

app.use('/api/patient/',patientRouter)

app.listen(5000,()=>{
    console.log("Server started");
})