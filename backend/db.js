import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@property-analyzer.nuxusgz.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`)
const db = mongoose.connection;

db.once('connected', function () {
    console.log('✅ Database is connected successfully.');
});

db.on('error', function (error) {
    console.log('❌ Something went wrong, Error:',error);
})
 
export default db