var usermodel=require("../models/userModel.js");

function addUser(req,res){
    var user=new usermodel.userModel({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        password:req.body.password,
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




module.exports={addUser,validate,getusers,getprofile}