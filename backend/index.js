import express from "express";
import 'dotenv/config'
import cors from 'cors'
import { fetchUsersData, fetchPropertiesData, fetchTimeTrackData, fetchCompanyData } from "./fetch-model.js";

const app = express();
app.use(express.json());

var whitelist = ['http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin, "origin request url")
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

const onListeningPort = () => {
    console.log("🚀 Server listening on PORT:", process.env.PORT)
}

app.get("/api/date-range", async (req, res) => {
    const start_date = new Date(req.query.start_date);
    const end_date = new Date(req.query.end_date);

    const time_track = await fetchTimeTrackData(start_date, end_date);
    const userIds = [...new Set(time_track.map(item => item.userId))];

    const users = await fetchUsersData(userIds);

    function validateProperty(userId) {
        const propertyID = [...new Set(time_track.map(item => item.userId == userId && item.propertyId).filter(Boolean))];
        if (!propertyID.length) { return null }
        const duration = time_track.map(item => item.userId == userId && item.duration).filter(Boolean);
        const averageDuration = duration.length > 1 ? duration.reduce((total, current) => total + current, 0) / duration.length : duration[0];
        return { averageDuration, propertyID }
    }

    const userPropertyData = users.map(user => {
        const userTrack = time_track.find(item => item.userId == user.user_id);
        if (userTrack) {
            const propertyData = validateProperty(user.user_id);
            if (propertyData) {
                
                const { propertyID, averageDuration } = propertyData;
                return { userId: user.user_id, username: user.username, propertyId: propertyID, companyId: userTrack.companyId, duration: Number(averageDuration).toFixed(2) };
            }
        }
    }).filter(Boolean);

     const userPropertyIds = userPropertyData.flatMap(item => item.propertyId);
    const companyIds = [...new Set(userPropertyData.map(item => item.companyId))];

    try {
        const [propertyData, companyData] = await Promise.all([
            fetchPropertiesData(userPropertyIds),
            fetchCompanyData(companyIds)
        ]);

        const propertyDataMap = new Map();

        propertyData.forEach(item => {
            const propertyId = item.property_id;
            if (propertyDataMap.has(propertyId)) {
                propertyDataMap.get(propertyId).push(item.address);
            } else {
                propertyDataMap.set(propertyId, [item.address]);
            }
        });
        const companyDataMap = new Map(companyData.map(item => [item.company_id, item]));

        const analyzedData = userPropertyData.map(({ userId, username, propertyId, companyId, duration }, i) => {
            const propertyFilterData = propertyId.flatMap(item => propertyDataMap.get(item)).filter(Boolean)
            const companyFilterData = companyDataMap.get(companyId.toString());
            if (propertyFilterData.length && companyFilterData.company_name) {
                const finalData = { userId, username, company: companyFilterData.company_name, duration, property: propertyFilterData };
                return finalData
            }
        }).filter(Boolean);
 
        if (analyzedData.length) {
            res.status(200).json({ status: 200, data: analyzedData });
        } else res.status(404).json({ status: 404, error: "No data found" });
    } catch (error) {
        console.log("❌ Error occurred:", error);
        res.status(500).json({ status: 500, message: error.message, data: null });
    }
});

(async () => {

    try {
        app.listen(process.env.PORT, onListeningPort)

    } catch (error) {
        console.error("Error: ", error.message)
    }
})()