

// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const bcrypt = require('bcrypt')
const Joi = require('joi');
const connection = require('../../../Model/dbConnection');


// Validation 
const vehicleCompanyValidate = Joi.object({
   vb_id: Joi.string().max(5).required(),
   name: Joi.string().max(15).required(),
})


///// Add Vehicles
const AddVehicleCompany = (req, res) => {
    try {
        const { error, value } = vehicleCompanyValidate.validate(req.body);

        if (error) {
            return res.send(error.details[0].message)
        }
        else {
            const value = [
                req.body.vb_id,
                req.body.name,
                req.file.location
                
            ]
            let sqlQuery = "INSERT INTO tbl_vehicle_brand(vb_id, name, logo) VALUES ( ?, ?, ?)";
            connection.query(sqlQuery, value, function (error, result) {
                if (error) {
                    console.log( error.sqlMessage);
                    if(error.code === 'ER_DUP_ENTRY' ){
                        res.send("Alert!!! Please check vehicle Id And Name ")
                    }
                    else{
                        res.send({
                            message: error
                        })
                    }
                }
                else {
                    res.send({
                        message: "Vehicle company added"
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.send("Error in vehicle company Registration: ",error);
    }
}


module.exports = AddVehicleCompany