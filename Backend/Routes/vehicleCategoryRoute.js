const express = require('express');
const cors  = require('cors')
const vehicleRoute = express.Router();
let multer = require('multer')
let multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3');
const AddVehicle = require('../Controler/vehicle/category/addVehicle');
const VehicleCategoryList = require('../Controler/vehicle/category/vehicleCatList');
const SearchVehicleCategory = require('../Controler/vehicle/category/searchVehicleCat');
const vehicleUpdate = require('../Controler/vehicle/category/vehicleUpdate');
let app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['POST', 'PUT', 'PATCH'],
    credentials: true
}))

let s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

let storage = multerS3({
    s3: s3,
    bucket: 'owlseye',
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage })


vehicleRoute.post('/list', VehicleCategoryList);
vehicleRoute.post('/add', upload.single('image'), AddVehicle);
vehicleRoute.post('/find/:vehicleSearch', SearchVehicleCategory);
vehicleRoute.put('/vehicle/update/:v_id', upload.single('image'), vehicleUpdate);
// userRoute.patch('/status/:admin_id', updateUsersStatus);

// It is for Testing Purpose
vehicleRoute.post('/', (req, res) =>{
    try {
       
        res.send("Hello Moto")
    } catch (error) {
        res.send(error)
    }

})

module.exports = vehicleRoute;