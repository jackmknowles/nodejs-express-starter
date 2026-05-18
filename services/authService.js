const fs = require('fs');

class AuthService {
    constructor() {
        this.filePath = "loginUsers.json";
    }

    readUsers() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading login users:', err);
            return [];
        }
    }

    findUser(email, password) {
        const users = this.readUsers();
        const user = users.find(u => u.email === email);
        if (!user || user.password !== password) return null;
        return user;
    }
}

module.exports = AuthService;
