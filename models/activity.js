var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
    todayDate: String,
    startTime: String, 
    endTime: String, 
    timeDifference: String, 
    task: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
    }
})


module.exports = mongoose.model("Activity", activitySchema);
