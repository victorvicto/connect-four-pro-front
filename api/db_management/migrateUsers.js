const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/users');

mongoose.connect(process.env.ATLAS_KEY, { useNewUrlParser: true, useUnifiedTopology: true });

async function migrateUsers() {
    try {
        const users = await User.find();
        for (const user of users) {
            if (user.elo === undefined) {
                user.elo = 600;
                await user.save();
                console.log(`Updated user ${user._id}`);
            }
            if (user.email === undefined) {
                user.email = user.username + '@' + user.username;
                await user.save();
                console.log(`Updated user ${user._id}`);
            }
        }
        console.log('Migration completed');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        mongoose.connection.close();
    }
}

migrateUsers();