import mongoose from 'mongoose';

//connect to db and wait for verification succesfully
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (e) {
    console.log(`MongoDB connection error:\n${e}`);
    //exit app with failure
    process.exit(1);
  }
};

export default connectDb;
