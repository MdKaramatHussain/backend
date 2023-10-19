// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')
app.use(express.json())
app.use(cors());
const connection = require('../../Model/dbConnection');
// To send email 
let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "karamathussain0288@gmail.com",
        pass: "iycqwlditkiuuxew"
    }
})

// Update Users Status
const updateUsersStatus = (req, res) => {
    try {

        let id = req.params.admin_id;
        let status = req.params.state;
        console.log(status)
        let sqlQuery = `UPDATE tbl_admin SET status = ? Where admin_id = '${id}'`
        connection.query(sqlQuery, status, function (error, result) {
            if (error) {
                console.log("ERROR", error.sqlMessage);
            }
            else {
                if (result.affectedRows > 0) {
                    let sqlQuery = `SELECT first_name, mobile_no, status, email FROM tbl_admin where admin_id = '${id}'`;
                    connection.query(sqlQuery, function (error, result) {
                        if (error) {
                            console.log("error", error.sqlMessage);
                        }
                        else {
                            // Mail start here
                            let clientMail = result[0].email;
                            let subject = "Status Changed ";
                            let mailBody = `Welcome ${result[0].first_name}!
                                            Your status is changed.
                                            Details  are:
                                            mobile: ${result[0].mobile_no}
                                            status: ${result[0].status} 
                                            Thank You! 
                                            Team Owlseye`;
                            let option = {
                                from: "karamathussain0288@gmail.com",
                                to: clientMail,
                                subject: subject,
                                text: mailBody
                            }
                            transport.sendMail(option, function (err, info) {
                                if (err) {
                                    console.log(`Fail to send mail to ${req.body.first_name}`, err);
                                }
                                else {
                                    res.send({
                                        message: "User Status Changed Successful"
                                    })
                                }
                            })
                        }
                    })


                }
            }
        })

    } catch (error) {
        res.send(error.sqlMessage);
    }
}

module.exports = updateUsersStatus