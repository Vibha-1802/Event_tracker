import bcrypt from "bcryptjs";

const inputPassword = process.argv[2];
if (!inputPassword) {
  console.log("provide a password");
  process.exit(1);
}

const hashPassword = async () => {
  const hashed = await bcrypt.hash(inputPassword,10);
  console.log("Hashed Password:");
  console.log(hashed);
};

hashPassword();

/* 
12345 - $2b$10$1rsDHvH3EJ8iTpp2Z7MaT.JMYSLPPfIoVRk80rkLhxun0an1InObC
123 - $2b$10$IZVpmIqeWf1Upolb4gPgwuKG/cQOOeO2Muj4a3tXPT8BJyHoQIqrC
admin123 - $2b$10$WWg0jo3DWvWmIhcjfHTjVeLfy9tp9mn29PfL7nOpXghykVweIQ1Ry
prof123 - $2b$10$IclvwoK6uz/aRlj/NpA8o.4.CN9Iitdwd9ZHv.GRCIPU6fNQGg7fu
prof12345 - $2b$10$Fm825RwZ4mfpy2oGvPNqwe/xUxKXDO02gZ.n0Wpc.WG2OeU6A5X3y 
*/