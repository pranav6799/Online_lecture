const express = require('express')
const router = express.Router()
const courseController = require('../Controller/courseController')
const authController = require('../Controller/authController')
const multer = require('multer')


const storage = multer.diskStorage({
  destination:function(req,file,cb){
    return cb(null, './uploads')
  },
  fileName:function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalName}`)
  },
})

const upload = multer({storage})

router.post('/add',authController.protect,authController.isAdmin,upload.single('photo'), courseController.addCourse)
router.get('/get', courseController.getAllCourse)

module.exports = router