var express = require('express');
var router = express.Router();
var ImageModule=require('../modules/upload'); 
var imageData = ImageModule.find({});
var path = require('path');
var multer = require('multer');

router.use(express.static(__dirname + "./public/"));

 var Storage = multer.diskStorage({
  destination : "./public/uploads/",
   filename:(req ,file , cb) =>{
     cb(null ,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
   }

});

var upload = multer({
  storage : Storage
}).single('file'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/try',function(req, res, next) {
  imageData.exec(function(err,data){
    if (err) throw error;
    res.render('try', { title: 'Image'   , success:"" , records:data});
  })

});

router.post('/try',upload , function(req, res, next) {
  imageFile = req.file.filename;
  var success = req.file.filename + "uploaded success";
  console.log(req.file.filename)
  var imageDetails = new ImageModule({
    imagename : imageFile
  });
  imageDetails.save(function(err,doc){
    if (err) throw err ;
    imageData.exec(function(err,data){
      if (err) throw err;
      res.render('try', { title: 'Image'  ,errors : '' ,records:data ,success:success});
    });
  });
 
});


module.exports = router;

