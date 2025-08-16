import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connected Succeffuyly : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error in db connection ${error.message}`);
    }
}

export default connectDB;