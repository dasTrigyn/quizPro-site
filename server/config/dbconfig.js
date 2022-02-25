

const mongoose = require('mongoose');
const url = "mongodb+srv://sdTrigyn:1435051051@cluster0.2jc00.mongodb.net/QuizDB?retryWrites=true&w=majority";
// const url = "mongodb://quizdb:<143>@cluster0-shard-00-00.peo6y.mongodb.net:27017,cluster0-shard-00-01.peo6y.mongodb.net:27017,cluster0-shard-00-02.peo6y.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-7lpali-shard-0&authSource=admin&retryWrites=true&w=majority"
module.exports = (async()=>{
  try {
    // Connect to the MongoDB cluster
     await mongoose.connect(
        url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" DB is connected")
    );

  } catch (e) {
    console.log("could not connect");
    console.log("Error in DB connection !" + JSON.stringify(e, undefined,2));
  }
  
})