// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const Joi = require('joi');
const connection = require('../../Model/dbConnection');


// Validation 
const userValidate = Joi.object({
    // pin: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
    pin: Joi.string().length(6).required(),
    mobile_no: Joi.string().length(10).required(),
    admin_id: Joi.string().min(3).max(4).required(),
    alternate_mobile_no: Joi.string().length(10).required(),
    email: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    DOB: Joi.string().required(),
    aadhaar_no: Joi.string().length(12).required(),
    pan_no: Joi.string().length(10).required()
})

// To send email 
let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "karamathussain0288@gmail.com",
        pass: "iycqwlditkiuuxew"
    }
})

/////Register users
const userReg = (req, res) => {
    try {
        const { error, value } = userValidate.validate(req.body);

        if (error) {
            // console.log(error);
            return res.send(error.details[0].message)
        }
        else {
            const value = [
                req.body.pin,
                req.body.mobile_no,
                req.body.admin_id,
                req.body.alternate_mobile_no,
                req.body.email,
                req.body.first_name,
                req.body.last_name,
                req.body.address,
                req.body.state,
                req.body.city,
                req.body.DOB, 
                req.files[0].location,
                req.body.aadhaar_no,
                req.body.pan_no,  
                req.files[1].location,  
                req.files[2].location,
                req.files[3].location,
                req.files[4].location
            ]
            let sqlQuery = "INSERT INTO tbl_admin(pin, mobile_no, admin_id, alternate_mobile_no, email, first_name, last_name, address, state, city, DOB, profile_photo, aadhaar_no, pan_no, aadhaar_photo_front_side, aadhaar_photo_back_side, pan_photo_front_side, pan_photo_back_side) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(sqlQuery, value, function (error, result) {
                if (error) {
                    console.log( error.sqlMessage);
                    if(error.code === 'ER_DUP_ENTRY' ){
                        res.send("Alert!!! Their is duplicate entry")
                    }
                }
                else {
                    if (result.affectedRows > 0) {

                        // Mail start here
                        let clientMail = req.body.email;
                        let subject = "Owlseye Welcomes You ";
                        let mailBody = `Welcome ${req.body.first_name}!
                        use ${clientMail} as your username and click on this link to set your password . 
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
                                console.log("email send successfully")
                                res.send({
                                    user: req.body.first_name,
                                    message: "User Registration Successful"
                                })
                            }
                        })

                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
        // res.send("Error in User Registration: ",error.message);
    }
}


module.exports = userReg
// module.exports = {userReg, upload}