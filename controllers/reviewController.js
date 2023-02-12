const { isImportEqualsDeclaration } = require("typescript")
var reviewmodel=require("../models/reviewModel")
var moviemodel=require("../models/movieModel")


async function addreview(req,res){
    var obj={
        name:req.body.name,
        email:req.body.email,
        rating:req.body.rating,
        review:req.body.review
    }
    await reviewmodel.reviewModel.updateOne({movieId:req.body.movieId},{$push:{reviews:obj}});
    await moviemodel.movieModel.updateOne({movieId:req.body.movieId},{$push:{reviewObjects:obj}})
    res.send("Review added successfully");
}


async function removereviews(movieId){
    console.log(movieId);
    await reviewmodel.reviewModel.deleteOne({movieId:"req.body.movieId"})
}


module.exports={addreview,removereviews};