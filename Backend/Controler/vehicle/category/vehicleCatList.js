// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const connection = require('../../../Model/dbConnection');

////show users list
const VehicleCategoryList = (req, res) => {
    try {
        let sqlQuery = "SELECT v_id, type, description, photo, added_on FROM tbl_vehicle_category";

        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
            }
            else {
                res.json(result)
            }
        })
    } catch (error) {
        res.send(error.sqlMessage);
    }
}

module.exports = VehicleCategoryList