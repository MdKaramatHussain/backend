

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
const userValidate = Joi.object({
   v_id: Joi.string().max(5).required(),
   type: Joi.string().max(15).required(),
   description: Joi.string().max(255).required(),

})


///// Add Vehicles
const AddVehicle = (req, res) => {
    try {
        const { error, value } = userValidate.validate(req.body);

        if (error) {
            
            return res.send(error.details[0].message)
        }
        else {
            const value = [
                req.body.v_id,
                req.body.type,
                req.body.description,
                req.file.location
                
            ]
            let sqlQuery = "INSERT INTO tbl_vehicle_category(v_id, type, description, photo) VALUES (?, ?, ?, ?)";
            connection.query(sqlQuery, value, function (error, result) {
                if (error) {
                    console.log( error.sqlMessage);
                    if(error.code === 'ER_DUP_ENTRY' ){
                        res.send("Alert!!! Please check vehicle Id And Name ")
                    }
                }
                else {
                    res.send({
                        message: "Vehicle category added"
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.send("Error in User Registration: ",error);
    }
}


module.exports = AddVehicle