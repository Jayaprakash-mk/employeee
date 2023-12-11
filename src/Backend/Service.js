const express = require('express');
const mysql = require('mysql2');
const cors  = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log("port listening")
});

const pool = mysql.createPool({
    connectionLimit : 10,
    user : 'root',
    host : 'localhost',
    password : 'root',
    database : 'Company',
});

app.post('/employee', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.error("Error in connecting to MYSQL", err);
            return res.status(500).json({message : "Error in connection to mysql database"});
        }

        const sql = "Insert into EmployeeData (`Employee_id`,`EmployeeName`,`Salary`,`Department`,`DOB`,`phoneNo`) values (?,?,?,?,?,?)";
        const values = [
            req.body.Employee_id,
            req.body.EmployeeName,
            req.body.Salary,
            req.body.Department,
            req.body.DOB,
            req.body.phoneNo
        ];

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
    pool.getConnection((err, connection) => {
        if(err){
            console.error("Error in connecting to MYSQL", err);
            return res.status(500).json({message : "Error in connection to mysql database"});
        }

        connection.query("Select * from EmployeeData", (err, data) => {
            connection.release(); // Release the connection back to the pool

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

        connection.query("Delete from EmployeeData where Employee_id = ?", req.params.id, (err, data) => {
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


// app.listen(3001, () => {
//     console.log("port listening")
// })