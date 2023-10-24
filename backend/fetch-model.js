import './db.js'
import propertiesModel from "./models/properties.js";
import timeTrackingDurationsModel from "./models/timeTrackingDurations.js";
import usersModel from "./models/user.js";
import companiesModel from "./models/company.js"; 

export const fetchUsersData = async (id) => {
    const query = { user_id: { $in: id } };

    try {
        const data = await usersModel.find(query);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}; 

export const fetchPropertiesData = async (id) => {    
    const query = { property_id: { $in: id } };
    try {
        const data = await propertiesModel.find(query);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const fetchCompanyData = async (id) => {
    const query = { company_id: { $in: id } };
    try {
        const data = await companiesModel.find(query);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const fetchTimeTrackData = async (start_date, end_date) => {    
    const query = {
        createdAt: {
            $gte: start_date,
            $lte: end_date,
        },
    }

try {
    const data = await timeTrackingDurationsModel.find(query);
    return data;
} catch (error) {
    console.error('Error fetching data:', error);
    throw error;
}
}