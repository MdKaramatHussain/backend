// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const connection = require('../../../Model/dbConnection');

////search user
const SearchVehicleCategory = (req, res) => {
    try {
        let searchData = req.params.vehicleSearch;
        let sqlQuery = `SELECT v_id, type, description, photo, added_on FROM tbl_vehicle_category WHERE v_id LIKE('%${searchData}%') || type LIKE('%${searchData}%') || added_on LIKE('%${searchData}%')`;

        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
            }
            else {
                if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "No data Found" })
                }
            }
        })
    } catch (error) {
        res.send(error.sqlMessage);
    }
}

module.exports = SearchVehicleCategory