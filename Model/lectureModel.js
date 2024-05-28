const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
  },
  lecture: {
    type: String,
    required: true,  
  },
  date: {
    type: Date,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Lecture", lectureSchema); 




