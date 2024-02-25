var express = require('express');
var router = express.Router();
const {addEmployee, getEmployeeData, deleteEmployee} = require('../controller/employee.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/employee', addEmployee);
router.get('/employeeData', getEmployeeData);
router.delete('/deleteData/:id', deleteEmployee);
module.exports = router;
