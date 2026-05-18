var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();

// Validation middleware
function validateEmployee(req, res, next) {
    const { name, address, salary, role } = req.body;

    if (!name || !address || !salary || !role) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (Number(salary) <= 0) {
        return res.status(400).json({ success: false, message: 'Salary must be a positive number.' });
    }
    next();
}

// GET /employees/add - show form
router.get('/add', (req, res) => {
    res.render('addEmployee');
});

// POST /employees/add - submit form
router.post('/add', validateEmployee, (req, res) => {
    const createdEmployee = employeeService.createEmployee(req.body);
    res.json({ success: true, employee: createdEmployee });
});

module.exports = router;