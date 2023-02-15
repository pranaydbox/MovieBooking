var theatremodel=require("../models/theatreModel")
var moviemodel=require("../models/movieModel")
var usermodel=require('../models/userModel')


async function addtheatre(req,res){

    var theatre=new theatremodel.theatreModel({
        theatreId:req.body.theatreId,
        theatreName:req.body.theatreName,
        ownerEmail:req.body.ownerEmail,
        category:req.body.category,
        theatreImage:req.file.path,
        location:req.body.location,
        bookings:req.body.bookings,
        access:req.body.access,
    })
    
    await theatre.save((err,data)=>{
        res.send("Theatre request sent to admin");
    })
}




async function accepttheatre(req,res)
{
    let result=await updateuseraccess(req.body.ownerEmail,"true");
    theatremodel.theatreModel.updateOne({ownerEmail:req.body.ownerEmail},{$set:{access:"accept"}},(err,data)=>{
        if(err) res.send("something went wrong")
        else res.send("theatre access accepted")
    })
}

function gettheatre(req,res)
{
    theatremodel.theatreModel.find({category:req.params.category,access:"pending"},(err,data)=>{
        res.send(data);
    })
}


async function updatetheatre(id,name,img,curremail){
    await theatremodel.theatreModel.updateOne({ownerEmail:curremail},{$push:{movieObjects:{movieId:id,movieName:name,movieImg:img}}}).then((e)=>{
        console.log(e);
    })
}

function removemoviefromtheatre(ownerEmail,movieId){
    theatremodel.theatreModel.updateOne({ownerEmail:ownerEmail},{$pull:{movieObjects:{movieId:movieId}}}).then((e)=>{
        console.log(e);
    });
}



async function removetheatre(req,res)
{
    let data=await theatremodel.theatreModel.findOne({ownerEmail:req.body.ownerEmail});
    updatemovie(data.theatreId);
    await updateuseraccess(req.body.ownerEmail,"false")

    theatremodel.theatreModel.deleteOne({ownerEmail:req.body.ownerEmail},(err,data)=>{
        res.send("Removed Successfully")
    });

}

async function rejecttheatre(req,res)
{
    theatremodel.theatreModel.updateOne({ownerEmail:req.body.ownerEmail},{$set:{access:"reject"}},(err,data)=>{
        if(err) res.send("something went wrong")
        else res.send("theatre access rejected")
    })

}



function updatemovie(theatreId){
    moviemodel.movieModel.updateMany({},{$pull:{theatreObjects : {theatreId:theatreId} }},(err,data)=>{
        console.log(data)
    })
}

async function updateuseraccess(ownerEmail,flag){
    await usermodel.userModel.updateOne({email:ownerEmail},{$set:{owner:flag}})
}


function getacceptedtheatres(req,res){
    theatremodel.theatreModel.find({access:"accept"},(err,data)=>{
        res.send(data);
    })
}



function gettheatres(req,res){
    theatremodel.theatreModel.find({},(err,data)=>{
        res.send(data);
    })
}



async function gettopthreetheatres(req,res)
{
    let data= await theatremodel.theatreModel.find({}).sort({"bookings":-1}).limit(3);
    return res.send(data);
}



module.exports={addtheatre,updatetheatre,removemoviefromtheatre,gettheatre,accepttheatre,removetheatre,getacceptedtheatres,gettheatres,gettopthreetheatres,rejecttheatre};