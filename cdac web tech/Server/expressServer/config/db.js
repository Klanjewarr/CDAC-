const mongoose=require ('mongoose') ;

 async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb+srv://dragger122003_db_user:admin123456@cluster0.h4uj6e6.mongodb.net/incident_db");
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