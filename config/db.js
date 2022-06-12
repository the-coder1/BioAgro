import mongoose from "mongoose"
const MONGO_URI = "mongodb+srv://digitalexplorer:digitalexplorer@test-explorer.bjxxi.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch(error){
    console.log(`Error: ${error.message}`)
  }
}

export default connectDB