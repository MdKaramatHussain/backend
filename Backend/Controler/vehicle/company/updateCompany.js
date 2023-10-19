// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const connection = require('../../../Model/dbConnection');

///// Add Vehicles
const UpdateCompany = (req, res) => {
    const id = req.params.vb_id
    const value = [
        req.body.name,
        req.file.location
    ]
    try {
        let sqlQuery = `UPDATE tbl_vehicle_brand SET name = ?, logo = ? WHERE vb_id ='${id}'`;
        connection.query(sqlQuery, value, function (error, result) {
            if (error) {
                console.log(error.sqlMessage);
            }
            else {
                res.send(result)
            }
        })

    } catch (error) {
        console.log(error)
        res.send("Error on updating vehicle company: ", error);
    }
}


module.exports = UpdateCompany