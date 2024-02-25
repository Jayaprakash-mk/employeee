const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const addEmployee = async (req, res, next) => {
    try {
      const data = await prisma.employeeDetail.create({
        data: {
          employeeName: req.body.employeeName,
          employeeId: req.body.employeeId,
          department: req.body.department,
          dob: new Date(req.body.dob),
          gender: req.body.gender,
          designation: req.body.designation,
          salary: req.body.salary,
        },
      });
  
      return res.json(data);
    } catch (error) {
      console.error("Prisma Error:", error);
      return res.status(500).json({ message: "Error creating employee record" });
    }
}

const getEmployeeData =  async (req, res, next) => {
    try {
      const data = await prisma.employeeDetail.findMany();
      return res.json(data);
    } catch (error) {
      console.error("Prisma Error:", error);
      return res.status(500).json({ message: "Error fetching employee data" });
    }
}

const deleteEmployee = async (req, res) => {
    try {
      const deletedEmployee = await prisma.employeeDetail.delete({
        where: {
          id: req.params.id,
        },
      });
  
      return res.json(deletedEmployee);
    } catch (error) {
      console.error("Prisma Error:", error);
      return res.status(500).json({ message: "Error deleting employee data" });
    }
}

module.exports = {addEmployee, getEmployeeData, deleteEmployee}