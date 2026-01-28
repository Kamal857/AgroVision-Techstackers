const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'backupkamal857@gmail.com';
        const user = await User.findOne({ email }).select('+password');

        if (user) {
            console.log('User found:');
            console.log('ID:', user._id);
            console.log('Name:', user.name);
            console.log('Email:', user.email);
            console.log('Role:', user.role);
            console.log('Password hash exists:', !!user.password);
        } else {
            console.log('User not found:', email);
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
    }
};

checkUser();
