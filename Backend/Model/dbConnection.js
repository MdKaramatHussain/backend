
let mysql = require('mysql');
let dotenv = require('dotenv');

dotenv.config()
let user = process.env.DB_USER ;
let pass = process.env.DB_PASS; 
let host = process.env.DB_HOST ;
let db = process.env.DB ;
let port = process.env.DB_PORT ;

let connection = mysql.createConnection({
    user: user,
    password: pass,
    host: host,
    port: port,
    database: db
})

connection.connect((err, result) => {    
    if (err) {
        console.log("Database not Connected :(" ,err); 
    }
    else {
        console.log("Database connected :)")
    }
})

module.exports = connection;
