const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const addEmployee = async (req, res, next) => {
    try {
      const data = await prisma.employeeDetail.create({
        data: {
          employeeName: req.body.employeeName.toLowerCase(),
          employeeId: req.body.employeeId.toLowerCase(),
          department: req.body.department.toLowerCase(),
          dob: new Date(req.body.dob),
          gender: req.body.gender,
          designation: req.body.designation.toLowerCase(),
          salary: req.body.salary.toString(),
        },
      });
  
      return res.json(data);
    } catch (error) {
      console.error("Prisma Error:", error);
      return res.status(500).json({ message: "Error creating employee record" });
    }
}

const getEmployeeData =  async (req, res, next) => {
  const { employeeName, employeeId, department, designation} = req.query;
  console.log(req.query);
    try {
      const data = await prisma.employeeDetail.findMany({
        where: {
          employeeName: { contains: employeeName.toLowerCase() || '' },
          employeeId: { contains: employeeId.toLowerCase() || '' },
          department: { contains: department.toLowerCase() || '' },
          designation: { contains: designation.toLowerCase() || '' },
        },
      });
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