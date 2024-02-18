import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MEARN_STACK_JOB_SEEKING"
    })
    .then(()=>{
        console.log("connected with database")
    })
    .catch((err)=>{
        console.log(`Error while connection with database: ${err}`)
    })
}