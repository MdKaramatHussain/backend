// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const connection = require('../../Model/dbConnection');

////search user
const SearchUser = (req, res) => {
    try {
        let searchData = req.params.userSearch;
        let sqlQuery = `SELECT admin_id, first_name, mobile_no, user_role, status, profile_photo, register_date, aadhaar_no, pan_no FROM tbl_admin WHERE first_name LIKE('%${searchData}%') || last_name LIKE('%${searchData}%') || mobile_no LIKE('%${searchData}%') || pan_no LIKE('%${searchData}%') || last_name LIKE('%${searchData}%')`;

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

module.exports = SearchUser