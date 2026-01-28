const mongoose = require('mongoose');
const User = require('./models/User');
const { login } = require('./controllers/authController');
require('dotenv').config();

// Mock response object
const mockRes = {
    status: function (code) {
        this.statusCode = code;
        return this;
    },
    json: function (data) {
        this.data = data;
        return this;
    }
};

const testLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const req = {
            body: {
                email: 'backupkamal857@gmail.com',
                password: 'kamal123'
            }
        };

        await login(req, mockRes);

        console.log('Login Status:', mockRes.statusCode);
        console.log('Login Data:', JSON.stringify(mockRes.data, null, 2));

        await mongoose.disconnect();
    } catch (err) {
        console.error('Test Error:', err);
    }
};

testLogin();
