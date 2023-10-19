const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
app.use(cors());


const userRoute = require('./Routes/users/userRoute');
const vehicleRoute = require('./Routes/vehicleCategoryRoute');
const vehicleCompanyRoute = require('./Routes/vehicleCompanyRoute');

// This is for User Routing
app.use('/api/admin/user', userRoute);

// This is for vehicle routing
app.use('/api/admin/vehicle/category', vehicleRoute)

// This is for vehicle company routing
app.use('/api/admin/vehicle/company', vehicleCompanyRoute)

// It is for testing purpose
app.post('/', (req, res)=>{
    res.send("hello ")
})
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
})