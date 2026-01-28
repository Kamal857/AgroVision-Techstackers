const mongoose = require('mongoose');
const User = require('./models/User');
const { forgotPassword, resetPassword } = require('./controllers/authController');
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

const testResetFlow = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'backupkamal857@gmail.com';

        // 1. Forgot Password
        console.log('\n--- Testing Forgot Password ---');
        const forgotReq = {
            body: { email },
            protocol: 'http',
            get: (header) => 'localhost:5000'
        };
        await forgotPassword(forgotReq, mockRes);
        console.log('Forgot Password Status:', mockRes.statusCode);
        const resetToken = mockRes.data.resetToken;
        console.log('Generated Reset Token:', resetToken);

        // 2. Reset Password
        console.log('\n--- Testing Reset Password ---');
        const newPassword = 'kamal' + Math.floor(Math.random() * 1000);
        console.log('Setting new password to:', newPassword);
        const resetReq = {
            params: { resettoken: resetToken },
            body: { password: newPassword }
        };
        await resetPassword(resetReq, mockRes);
        console.log('Reset Password Status:', mockRes.statusCode);
        console.log('Reset Password Success:', mockRes.data.success);

        // 3. Verify Login with new password
        console.log('\n--- Verifying Login with New Password ---');
        const user = await User.findOne({ email }).select('+password');
        const isMatch = await user.matchPassword(newPassword);
        console.log('New password matches:', isMatch);

        await mongoose.disconnect();
    } catch (err) {
        console.error('Verification Error:', err);
    }
};

testResetFlow();
