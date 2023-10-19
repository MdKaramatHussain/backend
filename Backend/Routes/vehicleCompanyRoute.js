const express = require('express');
const cors  = require('cors')
const vehicleCompanyRoute = express.Router();
let multer = require('multer')
let multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3');
const AddVehicleCompany = require('../Controler/vehicle/company/addCompany');
const ListCompany = require('../Controler/vehicle/company/companyList');
const CompanyDetail = require('../Controler/vehicle/company/companyDetail');
const UpdateCompany = require('../Controler/vehicle/company/updateCompany');
// const AddVehicle = require('../Controler/vehicle/category/addVehicle');

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


vehicleCompanyRoute.post('/list', ListCompany);
vehicleCompanyRoute.post('/add', upload.single('logo'), AddVehicleCompany);
vehicleCompanyRoute.post('/detail/:vb_id', CompanyDetail);
// vehicleRoute.post('/find/:vehicleSearch', SearchVehicleCategory);
vehicleCompanyRoute.put('/update/:vb_id', upload.single('logo'), UpdateCompany);
// userRoute.patch('/status/:admin_id', updateUsersStatus);

// It is for Testing Purpose
vehicleCompanyRoute.post('/test', (req, res) =>{
    try {
       
        res.send("Hello Moto")
    } catch (error) {
        res.send(error)
    }

})

module.exports = vehicleCompanyRoute;