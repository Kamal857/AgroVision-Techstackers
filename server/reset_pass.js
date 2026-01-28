const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'backupkamal857@gmail.com';
        const newPassword = 'kamal123';
        const user = await User.findOne({ email });

        if (user) {
            user.password = newPassword;
            await user.save();
            console.log('Password updated successfully for:', email);
        } else {
            console.log('User not found');
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

resetPassword();
