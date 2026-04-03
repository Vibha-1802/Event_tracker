import { User } from "../../Models/userModel.js"

export const seedUsers = async () => {
    
    const users = await User.insertMany([
    {
        staffId: "ADMIN001",
        password: "$2b$10$WWg0jo3DWvWmIhcjfHTjVeLfy9tp9mn29PfL7nOpXghykVweIQ1Ry", // admin123
        role: "Admin"
    },
    {
        staffId: "PROF001",
        password: "$2b$10$IclvwoK6uz/aRlj/NpA8o.4.CN9Iitdwd9ZHv.GRCIPU6fNQGg7fu", // prof123
        role: "Prof"
    },
    {
        staffId: "PROF002",
        password: "$2b$10$Fm825RwZ4mfpy2oGvPNqwe/xUxKXDO02gZ.n0Wpc.WG2OeU6A5X3y", // prof12345
        role: "Prof"
    },
    {
        staffId: "PROF003",
        password: "$2b$10$1rsDHvH3EJ8iTpp2Z7MaT.JMYSLPPfIoVRk80rkLhxun0an1InObC", // 12345
        role: "Prof"
    },
    {
        staffId: "PROF004",
        password: "$2b$10$IZVpmIqeWf1Upolb4gPgwuKG/cQOOeO2Muj4a3tXPT8BJyHoQIqrC", // 123
        role: "Prof"
    }
    ]);
    console.log("Users seeded");
    return users;
};
