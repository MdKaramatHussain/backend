// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const connection = require('../../Model/dbConnection');

////show users list
const userDetail = (req, res) => {
    try {
        let id = req.params.uid;
        let sqlQuery = `SELECT pin, alternate_mobile_no, email, address, state, city, DOB, admin_role, aadhaar_photo_front_side, aadhaar_photo_back_side, pan_photo_front_side, pan_photo_back_side, first_name, last_name, mobile_no, user_role, status, profile_photo, register_date, aadhaar_no, pan_no FROM tbl_admin WHERE  admin_id = '${id}'`;
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
            }
            else {
                if(result.length > 0){
                  res.json(result)  
                }
                else{
                    res.json({message:'No user matched'})
                }
            }
        })
    } catch (error) {
        res.send(error.sqlMessage);
    }
}

module.exports = userDetail