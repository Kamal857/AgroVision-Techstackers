const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUserDetail = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = 'backupkamal857@gmail.com';
        const user = await User.findOne({ email }).select('+password');

        if (user) {
            console.log('Email (JSON):', JSON.stringify(user.email));
            console.log('Name (JSON):', JSON.stringify(user.name));
            console.log('Password Hash:', user.password);
        } else {
            console.log('User not found');
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

checkUserDetail();
