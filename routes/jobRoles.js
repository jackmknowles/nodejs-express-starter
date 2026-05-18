var express = require('express');
var router = express.Router();

const JobRoleService = require('../services/jobRoleService');
const jobRoleService = new JobRoleService();

// Get all job roles
router.get('/', (req, res) => {
    const jobRoles = jobRoleService.getJobRoles();
    res.render('jobRoles', { jobRoles: jobRoles });
});

// Render add job role form
router.get('/add', (req, res) => {
    res.render('addJobRole');
});

// Handle add job role form submission
router.post('/add', (req, res) => {
    const newJobRole = req.body;
    jobRoleService.createJobRole(newJobRole);
    res.redirect('/job-roles');
});

module.exports = router;
