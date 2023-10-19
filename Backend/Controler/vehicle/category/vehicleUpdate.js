// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const Joi = require('joi');
const connection = require('../../../Model/dbConnection');

// Validation 
const vehicleValidate = Joi.object({
    type: Joi.string().min(1).max(15).required(),
    desc: Joi.string().min(1).max(255).required(),

})


// Update Users Status
const vehicleUpdate = (req, res) => {
    try {

        let id = req.params.v_id;
        const { error, value } = vehicleValidate.validate(req.body);

        if (error) {
            
            console.log(error)
            return res.send({
                message: error.details[0].message
            })
        }
        else {
            let data = [
                req.body.type,
                req.body.desc,
                req.file.location
            ];
            let sqlQuery = `UPDATE tbl_vehicle_category SET type = ?, description = ?, photo = ? Where v_id = '${id}'`
            connection.query(sqlQuery, data, function (error, result) {
                if (error) {
                    console.log("ERROR", error.sqlMessage);
                    res.send({
                        message: error.sqlMessage
                    })
                }
                else {
                    if (result.affectedRows > 0) {
                        res.send({
                            message: "Successful"
                        })
                    }
                    else {
                        res.send({
                            message: "Insert All Feild"
                        })
                    }

                }

            })
        }

    } catch (error) {
        
        console.log(req.body)
        res.send({
            message: 'Error in Catch Block '+error
        });
    }
}

module.exports = vehicleUpdate
