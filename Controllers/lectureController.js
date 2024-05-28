const Lecture = require("../Model/lectureModel");
const errorHandle = require("../utils/errorHandler");

exports.addSchedule = async (req, resp, next) => {
  try {
    const { course, lecture, date, instructor } = req.body;

    const newSchedule = new Lecture({
      course,
      lecture,
      date: new Date(date),
      instructor,
    });

    const schedule = await newSchedule.save();

    resp.status(200).json({
      status: true,
      schedule,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSchedule = async (req, resp, next) => {
  try {
    const course = req.params.id;

    if (!course) {
      return next(errorHandle(400, "No lectures Schedule"));
    }

    const schedule = await Lecture.find({
      course,
    })
      .populate("instructor")
      .populate("course")
      .select("-photo");

    resp.status(200).json({
      status: "success",
      schedule,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserSchedule = async (req, resp, next) => {
  try {
    const instructor = req.params.id;

    console.log(instructor);

    if (!instructor) {
      resp.json({
        msg: "Course Name is required",
      });
    }

    const schedule = await Lecture.find({ instructor })
      .populate("instructor")
      .populate("course")
      .select("-photo");
    console.log(schedule);

    resp.status(200).json({
      status: true,
      schedule,
    });
  } catch (err) {
    next(err);
  }
};

// exports.checkAvailable =async (req,resp,next)=>{
//   try{
//     const {instructor,date}=req.body
//     const targetDate = new Date(date)

//     const existingLecture = await Lecture.findOne({
//       instructor:mongoose.Types.ObjectId(instructor),
//       date:targetDate
//     }).populate('instructor')

// if(existingLecture){
//   resp.status(200).json({status:true, assigned:true,existingLecture})
// }

// resp.status(200).json({ status: true, assigned: false });

//   }catch{
//     next(err)
//   }
// }

exports.checkAvailable = async (req, resp, next) => {
  try {
    const { date, instructor } = req.body;

    const existingLecture = await Lecture.findOne({
      instructor,
      date: new Date(date),
    });

    if (existingLecture) {
      return resp.status(200).json({
        available: false,
        message: "Instructor is already assigned to a lecture on this date",
      });
    }

    resp.status(200).json({
      available: true,
      message: "Instructor is available on this date",
    });
  } catch (err) {
    next(err);
  }
};
