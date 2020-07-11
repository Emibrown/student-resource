var express = require('express');
var Multer = require('multer');
var mime = require('mime');
var fs = require('fs');
var router = express.Router();
var Student = require('../../models/student');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var Storage = Multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {

        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.matricNo.replace(/\//g, "")+file.originalname + "." + mime.extension(file.mimetype))
    }
});
var upload = Multer({ //multer settings
    storage: Storage,
    fileFilter: function(req, file, cb){
      if(file.mimetype !== mime.lookup('jpg')){
        req.fileValidationError = "Only jpg files are allowed";
        return cb(new Error('Only jpg files are allowed'))
      }
      cb(null, true)
    }
}).single('file');

//Post methods
router.post('/student', function(req, res, next) {
 upload(req,res,function(err){
      if(!req.body.fullname || !req.body.matricNo || !req.body.department || !req.body.faculty || !req.body.school || !req.body.gender ){
           sendJSONresponse(res, 400, {"message": "Please fill the form"});
           return;
      }
      Student.findOne({matricNo : req.body.matricNo}, function(err, student){
          if(err){
            return next(err)
          }
          if(student){
            sendJSONresponse(res, 400, {"message": "Student aready registered"});
              return;
          }else{
              if(req.fileValidationError){
                   console.log(req.fileValidationError);
                   sendJSONresponse(res, 400, {"message": req.fileValidationError});
                   return;
              }
              if(!req.file){
                   sendJSONresponse(res, 400, {"message": "Avatar required"});
                   return;
                }
                var newStudent = new Student({
                  fullName : req.body.fullname,
                  matricNo : req.body.matricNo,
                  department: req.body.department,
                  faculty : req.body.faculty,
                  school: req.body.school,
                  gender: req.body.gender,
                  avatar :{
                          name:req.file.filename,
                          path:"http://127.0.0.1:8080/upload/"+req.file.filename
                        } 
                });
                console.log(req.file);
             newStudent.save(function(error, stud){
                    if (error) { 
                      sendJSONresponse(res, 400, {"message": "Server busy"});
                      return;
                    }else{
                       sendJSONresponse(res, 200, stud);
                       return;
                  }
              });
          }
      });
    });
});	

router.post('/editstudent/:id', function(req, res, next) {
    
    upload(req,res,function(err){

      if(!req.body.fullName  || !req.body.department || !req.body.faculty || !req.body.school || !req.body.gender ){
         sendJSONresponse(res, 400, {"message": "Please fill the form"});
         return;
      }

      if(req.fileValidationError){
           console.log(req.fileValidationError);
           sendJSONresponse(res, 400, {"message": req.fileValidationError});
           return;
      }
     if(req.file){
         var updateStudent = {
          fullName : req.body.fullName,
          department: req.body.department,
          faculty : req.body.faculty,
          school: req.body.school,
          gender: req.body.gender,
          avatar :{
            name:req.file.filename,
            path:"http://127.0.0.1:8080/upload/"+req.file.filename
          } 
        };
      }else{
          var updateStudent = {
            fullName : req.body.fullName,
            department: req.body.department,
            faculty : req.body.faculty,
            school: req.body.school,
            gender: req.body.gender
          }
      }
      Student.findOneAndUpdate({_id: req.params.id}, updateStudent, {new: true}, function(err, student) {
        if (err) {   return next(err); }
          console.log(student);
           sendJSONresponse(res, 200, student);
           return;
      });
    });
});

router.post('/studentremove/:id', function(req, res, next) {
    Student.findOneAndRemove({ _id: req.params.id },function(err,student) {
         if (err) { return next(err); }
         fs.unlink('public/upload/'+student.avatar.name, function(err){
          if (err && err.code == "ENOENT") {
            return sendJSONresponse(res, 400, {"message": "file doesnt exist"});
          } else if(err) {
            return sendJSONresponse(res, 400, {"message": "error"});
          }else{
              console.log("file removed");
              sendJSONresponse(res, 200, student);
          }
         })
    });
});



//Get methods
router.get('/student', function(req, res, next) {
    Student.find({}, function(err, student) {
        if (err) {
			sendJSONresponse(res, 404, err);
		} else {
			sendJSONresponse(res, 200, student);
		}
	});
});

router.get('/student/:id', function(req, res, next) {
  Student.findOne({ _id: req.params.id }, function(err, student) {
  if (err) { return next(err); }
  if (!student) { return next(404); }
  sendJSONresponse(res, 200, student);
  });
});



module.exports = router;
