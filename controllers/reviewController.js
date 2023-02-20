var reviewmodel=require("../models/reviewModel")
var moviemodel=require("../models/movieModel")


async function addreview(req,res){
    var obj={
        name:req.body.name,
        email:req.body.email,
        rating:req.body.rating,
        review:req.body.review,
        date:new Date(),
        userimage:req.body.userimage
    }
    await reviewmodel.reviewModel.updateOne({movieId:req.body.movieId},{$push:{reviews:obj}});
    await moviemodel.movieModel.updateOne({movieId:req.body.movieId},{$push:{reviewObjects:obj}})
    res.send("Review added successfully");
}


async function removereviews(movieId){
    await reviewmodel.reviewModel.deleteOne({movieId:movieId})
}


function getreviews(req,res){
    reviewmodel.reviewModel.findOne({movieId:req.body.movieId},(err,data)=>{
        res.send(data.reviews);
    })
}


module.exports={addreview,removereviews,getreviews};