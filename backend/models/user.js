import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_id: String,
    username: String,
});

const usersModel = mongoose.model('users', userSchema); 
export default usersModel;
