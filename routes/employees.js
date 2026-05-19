var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();

const JobRoleService = require('../services/jobRoleService');
const jobRoleService = new JobRoleService();

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

// GET /employees - show all employees
router.get('/', (req, res) => {
    const employees = employeeService.getAllEmployees();
    const jobRoles = jobRoleService.getJobRoles();
    res.render('viewEmployees', { employees: employees, jobRoles: jobRoles });
});

// GET /employees/add - show form
router.get('/add', (req, res) => {
    const jobRoles = jobRoleService.getJobRoles();
    res.render('addEmployee', { jobRoles: jobRoles });
});

// POST /employees/add - submit form
router.post('/add', validateEmployee, (req, res) => {
    const createdEmployee = employeeService.createEmployee(req.body);
    res.json({ success: true, employee: createdEmployee });
});

// GET /employees/update/:id - show update form with pre-filled data
router.get('/update/:id', (req, res) => {
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) {
        return res.status(404).send('Employee not found');
    }
    const jobRoles = jobRoleService.getJobRoles();
    res.render('updateEmployee', { employee: employee, jobRoles: jobRoles });
});

// POST /employees/update/:id - handle update form submission
router.post('/update/:id', validateEmployee, (req, res) => {
    const employee = employeeService.updateEmployee(parseInt(req.params.id), req.body);
    if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json({ success: true, employee: employee });
});

// GET /employees/:id - show single employee detail
router.get('/:id', (req, res) => {
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) {
        return res.status(404).send('Employee not found');
    }
    res.render('employeeDetail', { employee: employee });
});

// DELETE /employees/:id - delete an employee
router.delete('/:id', (req, res) => {
    const deleted = employeeService.deleteEmployee(parseInt(req.params.id));
    if (!deleted) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json({ success: true, message: 'Employee deleted successfully' });
});

module.exports = router;