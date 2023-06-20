const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

let con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

con.connect(function(err){
    if(err){
         console.log('error')
         throw err
    }
    console.log("Successfully connected to DOMOFON")
})

module.exports = con