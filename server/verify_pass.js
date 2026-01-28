const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const verifyPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'backupkamal857@gmail.com';
        const passwordToTest = 'kamal123';
        const user = await User.findOne({ email }).select('+password');

        if (user) {
            console.log('User found:', user.email);
            const isMatch = await bcrypt.compare(passwordToTest, user.password);
            console.log('Password "kamal123" matches:', isMatch);
        } else {
            console.log('User not found:', email);
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
    }
};

verifyPassword();
