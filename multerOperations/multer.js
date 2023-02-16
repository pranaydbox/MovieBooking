const path=require("path")
const multer=require('multer');
var storage=multer.diskStorage({
    destination:function(req,File,cb){
        cb(null,'multerOperations/uploads')
    },
    filename:(req,File,cb)=>{
        cb(null,File.originalname)
    }
})
 


var  upload=multer({storage:storage});

module.exports={upload};

