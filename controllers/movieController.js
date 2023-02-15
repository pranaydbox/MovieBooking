var moviemodel=require("../models/movieModel")
var theatremodel=require("../models/theatreModel")
var theatreController=require("./theatreController")
var reviewmodel=require("../models/reviewModel");
var reviewController=require("../controllers/reviewController")


async function addmovie(req,res){
    var movie=new moviemodel.movieModel({
        movieId:req.body.movieId,
        cardImage:req.files.cardImage[0].path,
        coverImage:req.files.coverImage[0].path,
        name:req.body.name,
        category:req.body.category,
        duration:req.body.duration,
        languages:req.body.languages,
        format:req.body.format,
        description:req.body.description,
        bookings:req.body.bookings,
        access:req.body.access,
        startDate:req.body.startDate
    })
    let result=await movie.save();
    var review=new reviewmodel.reviewModel({
        movieId:req.body.movieId,
    })
    await review.save();
    res.send("Movie added successfully")
    
}



async function addexisting(req,res){
    var movieId=req.params.id;
    let movieData=await moviemodel.movieModel.findOne({movieId:movieId});
    
    let theatreUpdateResult=await theatreController.updatetheatre(movieData.movieId,movieData.name,movieData.cardImage,req.body.curremail);
    let theatreData=await theatremodel.theatreModel.findOne({ownerEmail:req.body.curremail});
    var obj={
        theatreId:theatreData.theatreId,
        theatreName:theatreData.theatreName,
        category:theatreData.category,
        location:theatreData.location
    }
    let movieUpdateResult=await moviemodel.movieModel.updateOne({movieId:movieData.movieId},{$push:{theatreObjects:obj}})
    res.send("Existed Movie added successfully")
}





function getownermovies(req,res){
    theatremodel.theatreModel.findOne({ownerEmail:req.body.curremail},(err,data)=>{
        console.log(data);
        res.send(data.movieObjects);
    });
}


function getmovies(req,res){
    moviemodel.movieModel.find({theatreObjects:{$not:{$size:0}}},(err,data)=>{
        res.send(data);
    })
}

function getmovie(req,res){
    moviemodel.movieModel.findOne({movieId:req.params.id},(err,data)=>{
        res.send(data);
    })
}

async function removeownermovie(req,res){
    let data=await theatremodel.theatreModel.findOne({ownerEmail:req.body.curremail});
    let resultOfMovieRemoveFromTheatre=await theatreController.removemoviefromtheatre(req.body.curremail,req.body.movieId);
    let resultOfTheatreRemoveFromMovie=await moviemodel.movieModel.updateOne({movieId:req.body.movieId},{$pull:{theatreObjects:{theatreId:data.theatreId}}}).then((e)=>{console.log(e)});
    // console.log(resultOfMovieRemoveFromTheatre+":"+resultOfTheatreRemoveFromMovie);
    res.send("Successfully Deleted Movie From Theatre")
}



async function gettopsixmovies(req,res)
{
    let data= await moviemodel.movieModel.find({}).sort({"bookings":-1}).limit(6);
    return res.send(data);
}


async function getexistingmovies(req,res){
    let data=await theatremodel.theatreModel.findOne({ownerEmail:req.body.curremail});
    moviemodel.movieModel.find({theatreObjects:{$not:{$elemMatch:{theatreId:data.theatreId}}}},(err,data)=>{
        res.send(data);
    })
}

async function removemovie(req,res){
    await moviemodel.movieModel.deleteOne({movieId:req.body.movieId})
    await theatremodel.theatreModel.updateMany({},{$pull:{movieObjects:{movieId:req.body.movieId}}})
    await reviewController.removereviews(req.body.movieId);
    res.send("Successfully deleted movie");
}


module.exports={addmovie,getmovies,getmovie,addexisting,getownermovies,removeownermovie,gettopsixmovies,getexistingmovies,removemovie};