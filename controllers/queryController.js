var querymodel=require("../models/queryModel")

function addqueries(req,res){
    var query=new querymodel.queryModel({
        name:req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message
    })
    query.save((err,data)=>{
        res.send("Added Successfully");
    })
}

function getqueries(req,res){
    querymodel.queryModel.find({},(err,data)=>{
        res.send(data);
    })
}

module.exports={addqueries,getqueries}