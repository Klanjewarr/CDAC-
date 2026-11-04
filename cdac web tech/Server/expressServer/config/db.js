const mongoose=require ('mongoose') ;
require("dotenv").config()
 async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("You successfully connected to MongoDB!");
    return mongoose;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
 async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}

module.exports={connectToMongoDB,disconnectFromMongoDB}