const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connecToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to DB");
     } catch (error) {
         console.log(error);
     }
}

module.exports = { connecToMongoDB };