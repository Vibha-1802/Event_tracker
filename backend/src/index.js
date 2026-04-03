import express from "express";
import mongoose from "mongoose";
import path from "path";

import { adminRoutes } from "./routes/adminRoutes.js";
import { fdpRoutes } from "./routes/fdpRoutes.js";
import { paperRoutes } from "./routes/paperRoutes.js";
import { patentRoutes } from "./routes/patentRoutes.js";
import { profileRoutes } from "./routes/profileRoutes.js";
import { socialServiceRoutes } from "./routes/socialServiceRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";


const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/eventTracker')
.then(()=>{
    console.log("CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("MONGO CORRECTION ERROR!!!")
    console.log(err)
})

app.get('/', (req, res) => {
    res.send("Server running");
});

app.use('/admin',adminRoutes)
app.use('/fdp',fdpRoutes)
app.use('/paper',paperRoutes)
app.use('/patent',patentRoutes)
app.use('/profile',profileRoutes)
app.use('/socialservice',socialServiceRoutes)
app.use('/users',userRoutes)

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})