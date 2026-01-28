const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const users = await User.find({});
        console.log('Total users:', users.length);
        users.forEach(u => {
            console.log(`- ${u.name} (${u.email}) [${u.role}]`);
        });
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

listUsers();
