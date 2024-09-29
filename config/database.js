const mongoose = require("mongoose");


mongoose.connect( "mongodb://localhost:27017",{
    useNewUrlParser: true,
  useUnifiedTopology: true
}
 ).then(()=>console.log("database connected")).catch((err)=> console.log("not connected" , err));

 module.exports = mongoose;