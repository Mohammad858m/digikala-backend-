const mongoose = require("mongoose");

 const cDB =() =>{mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => { 
    console.log("MongoDB connection failed");
  });
}

module.exports = cDB;
