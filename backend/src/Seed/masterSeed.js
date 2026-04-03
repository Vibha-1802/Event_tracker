import mongoose from "mongoose";

import { seedUsers } from "./OtherSeeds/userSeed.js";
import { seedFdp } from "./OtherSeeds/fdpSeed.js";
import { seedPaper } from "./OtherSeeds/paperSeed.js";
import { seedPatent } from "./OtherSeeds/patentSeed.js";
import { seedProfile } from "./OtherSeeds/profileSeed.js";
import { seedSocialService } from "./OtherSeeds/socialServiceSeed.js";

mongoose.connect('mongodb://127.0.0.1:27017/EventTracker')
.then(()=>{
    console.log("CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("MONGO CORRECTION ERROR!!!")
    console.log(err)
})

const runSeeds = async () => {
  try {
    console.log("Seeding started...");
    const users = await seedUsers();

    await seedFdp(users);
    await seedPaper(users);
    await seedPatent(users);
    await seedProfile();    
    await seedSocialService(users);
    console.log("🎉 ALL DATA SEEDED SUCCESSFULLY!");
    process.exit(); 
  } catch (err) {
    console.log("ERROR DURING SEEDING: ", err);
    process.exit(1);
  }
};

runSeeds();