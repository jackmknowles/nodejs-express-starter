const fs = require('fs');

class JobRoleService {
    constructor() {
        this.filePath = "jobRoles.json";
    }

    readJobRoles() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading job roles:', err);
            return [];
        }
    }

    writeJobRoles(jobRoles) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(jobRoles, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing job roles:', err);
        }
    }

    getJobRoles() {
        return this.readJobRoles();
    }

    createJobRole(newJobRole) {
        const jobRoles = this.readJobRoles();
        newJobRole.id = jobRoles.length ? jobRoles[jobRoles.length - 1].id + 1 : 1;
        jobRoles.push(newJobRole);
        this.writeJobRoles(jobRoles);
        return newJobRole;
    }
}

module.exports = JobRoleService;
