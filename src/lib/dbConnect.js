import mongoose from 'mongoose';


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};



const dbConnect =  async  ()=> {
  const uri = `${process.env.MONGODB_URI}`;

  if (!uri) {
    throw new Error(`N0  environment variable SET: "MONGODB_URI"`);
  }

  try {
    const conn = await mongoose.connect(uri, options);
    console.log(`Connected to DB `);
    return conn;
  }
  catch (error) {
    console.log("ERROR connecting to DB \n" + error);
    throw error;

  }
}



export default dbConnect;