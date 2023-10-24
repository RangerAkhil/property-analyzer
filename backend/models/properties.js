import mongoose from 'mongoose';

const propertiesSchema = new mongoose.Schema({
    property_id: Number,
    address: String,
});


const propertiesModel = mongoose.model('properties', propertiesSchema);
export default propertiesModel;