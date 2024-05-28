const Course = require("../Model/courseModel");
const errorHandler = require("../utils/errorHandler");

exports.addCourse = async (req, resp, next) => {
  console.log(req.body, req.file, 35);
  try {
    const { name, level, description } = req.body;

    const photo = req.file;
    if (!photo) {
      return resp.status(400).json({
        status: false,
        message: "Photo is required",
      });
    }

    const newCourse = new Course({
      name,
      level,
      description,
      photo: photo.path,
    });

    await newCourse.save();

    //   const {photo}= req.files

    //   console.log(photo)

    //   const newCourse = new Course({ ...req.fields});

    //   newCourse.photo.data = fs.readFileSync(photo.path);
    //   newCourse.photo.contentType = photo.type;

    //  await newCourse.save();

    resp.status(200).json({
      status: true,
      message: "Course Added Successfully",
      newCourse,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllCourse = async (req, resp, next) => {
  try {
    const course = await Course.find();

    resp.status(200).json({
      status: "success",
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOneCourse = async (req, resp, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(errorHandler(404, "Course Not found with that id"));
    }

    resp.status(200).json({
      status: true,
      course,
    });
  } catch (err) {
    next(err);
  }
};
