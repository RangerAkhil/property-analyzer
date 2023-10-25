import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection;

db.once('connected', function () {
    console.log('✅ Database is connected successfully.');
});

db.on('error', function (error) {
    console.log('❌ Something went wrong, Error:',error);
})
 
export default db