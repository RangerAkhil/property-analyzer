import mongoose from 'mongoose';

const timeTrackingDurationsSchema = new mongoose.Schema({
    userId: Number,
    companyId: Number,
    propertyId: Number,
    endTime: Date,
    duration: Number,
    createdAt: Date
});

const timeTrackingDurationsModel = mongoose.model('time_tracking_durations', timeTrackingDurationsSchema);
export default timeTrackingDurationsModel;