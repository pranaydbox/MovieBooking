var usermodel=require("../models/userModel.js");
var moviemodel=require("../models/movieModel");
var reviewmodel=require("../models/reviewModel");

function addUser(req,res){
    var user=new usermodel.userModel({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        password:req.body.password,
        dob:null,
        image:"multerOperations/uploads/intialuser.jpg",
        gender:null,
        address:null,
        owner:"false",
        admin:"false"
    })
    usermodel.userModel.findOne({email:req.body.email},(err,data)=>{
        if(data!=undefined){
            res.send("User already exists");
        }
        else{
            user.save((err,data)=>{
                if(err){
                    res.send("Some error");
                }
                else{
                    res.send("Added succesfully");
                }
            })
        }
    })
}


function validate(req,res){
    usermodel.userModel.findOne({email:req.body.email},(err,data)=>{
        if(data!=undefined){
            if(data.password==req.body.password){
                res.send("exists");
            }
            else{
                res.send("not exists");
            }
        }
        else{
            res.send("not exists");
        }
    })
}


function getusers(req,res){
    usermodel.userModel.find({},(err,data)=>{
        res.send(data);
    })
}


function getprofile(req,res){
    usermodel.userModel.findOne({email:req.body.curremail},(err,data)=>{
        res.send(data);
    })
}


async function uploadimage(req,res){
    await usermodel.userModel.updateOne({email:req.body.curremail},{$set:{image:req.file.path}})
    await moviemodel.movieModel.updateMany({"reviewObjects.email":req.body.curremail},{$set:{"reviewObjects.$.userimage":req.file.path}});
    await reviewmodel.reviewModel.updateMany({"reviews.email":req.body.curremail},{$set:{"reviews.$.userimage":req.file.path}})
    res.send("Uploaded successfully")
}


async function updateprofile(req,res){
    await usermodel.userModel.updateOne({email:req.body.email},{$set:{name:req.body.name,mobile:req.body.mobile,dob:req.body.dob,gender:req.body.gender,address:req.body.address}});
    await moviemodel.movieModel.updateMany({"reviewObjects.email":req.body.email},{$set:{"reviewObjects.$.name":req.body.name}});
    await reviewmodel.reviewModel.updateMany({"reviews.email":req.body.email},{$set:{"reviews.$.name":req.body.name}});
    res.send("Profile Updated");
}


module.exports={addUser,validate,getusers,getprofile,uploadimage,updateprofile}