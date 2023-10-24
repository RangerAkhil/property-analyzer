import mongoose from 'mongoose';

const companiesSchema = new mongoose.Schema({
    company_id: String,
    company_name: String,
});

const companiesModel = mongoose.model('companies', companiesSchema);
export default companiesModel;