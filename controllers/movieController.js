var moviemodel=require("../models/movieModel")
var theatremodel=require("../models/theatreModel")
var theatreController=require("./theatreController")




async function addmovie(req,res){
    console.log(req.body.curremail)

    let data=await theatremodel.theatreModel.findOne({ownerEmail:req.body.curremail});

    var obj={
        theatreId:data.theatreId,
        theatreName:data.theatreName,
        category:data.category,
        location:data.location
    }  
    
    var movie=new moviemodel.movieModel({
        movieId:req.body.movieId,
        cardImage:req.body.cardImage,
        coverImage:req.body.coverImage,
        name:req.body.name,
        category:req.body.category,
        duration:req.body.duration,
        languages:req.body.languages,
        format:req.body.format,
        description:req.body.description,
        bookings:req.body.bookings,
        access:req.body.access
    })

    theatreController.updatetheatre(req.body.movieId,req.body.name,req.body.cardImage,req.body.curremail);

    let result=await movie.save();
    
    let x=await moviemodel.movieModel.updateOne({movieId:req.body.movieId},{$push:{theatreObjects:obj}});
    console.log(x);

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
    console.log(req.body.curremail)
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




module.exports={addmovie,getmovies,getmovie,addexisting,getownermovies,removeownermovie,gettopsixmovies,getexistingmovies};