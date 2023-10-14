import mongoose from 'mongoose';


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};



const dbConnect =  async  ()=> {
  const uri = `${process.env.MONGODB_URI}/projectData?retryWrites=true&w=majority`;

  if (!uri) {
    throw new Error(`N0  environment variable SET: "MONGODB_URI"`);
  }

  try {
    const conn = await mongoose.connect(uri, options);
    console.log(`Connected to DB `);
  }
  catch (error) {
    console.log("ERROR connecting to DB \n" + error);
    process.exit(1);

  }
}



export default dbConnect;