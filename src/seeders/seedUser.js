const User = require('../models/User');
const sequelize = require('../config/db');

const seed = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate([
        {
            name: "admin", 
            mobile: "09123456789",
            password: "12345678"
        },
        {
            name: "moein", 
            mobile: "09135882813",
            password: "12345678"
        }
    ]);

    console.log("Users have been seeded!");
    process.exit();
}

seed();