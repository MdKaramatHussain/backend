// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const connection = require('../../Model/dbConnection');

////show users list
const userList = (req, res) => {
    try {
        let sqlQuery = "SELECT admin_id, first_name, mobile_no, user_role, status, profile_photo, register_date, aadhaar_no, pan_no FROM tbl_admin";

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

module.exports = userList