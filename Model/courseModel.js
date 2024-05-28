const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  photo:{
    type:String
  }

})



module.exports = mongoose.model('Course', courseSchema )
