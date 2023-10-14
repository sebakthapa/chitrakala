import mongoose from 'mongoose';


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connections = {};

const dbConnect =  async  (dbName)=> {
  const uri = `${process.env.MONGODB_URI}/${dbName}?retryWrites=true&w=majority`;

  if (!uri) {
    throw new Error(`N0  environment variable SET: "MONGODB_URI_${dbName.toUpperCase()}"`);
  }

  try {
    const conn = await mongoose.connect(uri, options);
    connections[dbName] = conn;
    console.log(`Connected to DB ${dbName}`);
  }
  catch (error) {
    console.log("ERROR connecting to DB \n" + error);
    process.exit(1);

  }
}

export function closeConnection(dbName) {

  try {
    const conn = connections[dbName];
    console.log("Closed Connection"+ dbName)
    
    if (!conn) {
      throw new Error('No connection for ' + dbName);
    }
  
    return mongoose.connection.close();
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect;