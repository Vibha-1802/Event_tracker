import express from "express";
import mongoose from "mongoose";

import { adminRoutes } from "./Routes/adminRoutes.js";
import { fdpRoutes } from "./Routes/fdpRoutes.js";
import { paperRoutes } from "./Routes/paperRoutes.js";
import { patentRoutes } from "./Routes/patentRoutes.js";
import { profileRoutes } from "./Routes/profileRoutes.js";
import { socialServiceRoutes } from "./Routes/socialServiceRoutes.js";
import { userRoutes } from "./Routes/userRoutes.js";
import { combinedRoutes } from "./Routes/combinedRoutes.js";


const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/EventTracker')
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
app.use('/combined',combinedRoutes)

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})