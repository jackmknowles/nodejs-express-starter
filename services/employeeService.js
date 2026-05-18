// employeeService.js
const fs = require('fs');

class EmployeeService {
    constructor() {
        this.filePath = "employees.json";
    }

    readEmployees() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading employees:', err);
            return [];
        }
    }

    writeEmployees(employees) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(employees, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing employees:', err);
        }
    }

    getAllEmployees() {
        return this.readEmployees();
    }

    // Get a single employee by their ID
    getEmployeeById(id) {
        const employees = this.readEmployees();
        return employees.find(emp => emp.id === id);
    }

    generateEmployeeNumber(employees) {
        const nextId = employees.length ? employees[employees.length - 1].id + 1 : 1;
        return 'EMP' + String(nextId).padStart(3, '0');
    }

    createEmployee(newEmployee) {
        const employees = this.readEmployees();
        newEmployee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
        newEmployee.employeeNumber = this.generateEmployeeNumber(employees);
        newEmployee.salary = Number(newEmployee.salary);
        employees.push(newEmployee);
        this.writeEmployees(employees);
        return newEmployee;
    }

    updateEmployee(id, updatedData) {
        const employees = this.readEmployees();
        const employee = employees.find(emp => emp.id === id);
        if (!employee) {
            return null;
        }
        employee.name = updatedData.name;
        employee.address = updatedData.address;
        employee.salary = Number(updatedData.salary);
        employee.role = updatedData.role;
        this.writeEmployees(employees);
        return employee;
    }
}

module.exports = EmployeeService;