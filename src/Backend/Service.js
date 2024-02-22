const express = require('express');
const mysql = require('mysql2');
const cors  = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log("port listening")
});

const pool = mysql.createPool({
    connectionLimit : 10,
    user : process.env.DB_NAME,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DBNAME,
});

app.post('/employee', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.error("Error in connecting to MYSQL", err);
            return res.status(500).json({message : "Error in connection to mysql database"});
        }
        //console.log(req.body);
        const sql = "Insert into employeeDetail (`employeeName`,`employeeId`,`department`,`dob`,`gender`,`designation`, `salary`) values (?,?,?,?,?,?,?)";
        const values = [
            req.body.employeeName,
            req.body.employeeId,
            req.body.department,
            req.body.dob,
            req.body.gender,
            req.body.designation,
            req.body.salary,
        ];
        console.log(values);
        connection.query(sql, values, (err, data) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error("MySQL Query Error:", err);
                return res.status(500).json({ message: "Error executing SQL query" });
            } else {
                return res.json(data);
            }
        });
    });
});

app.get('/employeeData', (req, res) => {
    console.log("connection success");
    pool.getConnection((err, connection) => {
        if(err){
            console.error("Error in connecting to MYSQL", err);
            return res.status(500).json({message : "Error in connection to mysql database"});
        }

        connection.query("select * from employeeDetail", (err, data) => {
            connection.release(); // Release the connection back to the pool
            console.log(data);
            if (err) {
                console.error("MySQL Query Error:", err);
                return res.status(500).json({ message: "Error executing SQL query" });
            } else {
                return res.send(data);
            }
        });
    });
});

app.delete(`/deleteData/:id`, (req,res) => {
    console.log('DELETE request received. ID:', req.params.id);
    pool.getConnection((err, connection) => {
        if(err){
            console.error("Error in connecting to MYSQL", err);
            return res.status(500).json({message : "Error in connection to mysql database"});
        }

        connection.query("Delete from employeeDetail where employeeId = ?", req.params.id, (err, data) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error("MySQL Query Error:", err);
                return res.status(500).json({ message: "Error executing SQL query" });
            } else {
                return res.json(data);
            }
        });
    });



})


// app.listen(3002, () => {
//     console.log("port listening")
// })