import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(e) {
        console.error(`Error: ${e.message}`)
    }
}

export default connectDB