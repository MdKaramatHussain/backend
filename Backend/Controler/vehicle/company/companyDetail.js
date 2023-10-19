


// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const connection = require('../../../Model/dbConnection');

///// Add Vehicles
const CompanyDetail = (req, res) => {
    const id = req.params.vb_id;
    try {
        let sqlQuery = `SELECT vb_id, name, logo, added_on FROM tbl_vehicle_brand where vb_id = '${id}'`;
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log(error.sqlMessage);
            }
            else {
                res.send(result)
            }
        })

    } catch (error) {
        console.log(error)
        res.send("Error in vehicle company List: ", error);
    }
}


module.exports = CompanyDetail