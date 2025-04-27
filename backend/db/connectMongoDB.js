import mongoose from "mongoose";
const connectMongoDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("connection success");
    }catch(error){
        console.error("Error during connection to mongo db",error)
    }
}
export default connectMongoDB;