var bookingmodel=require("../models/bookingModel")
var moviemodel=require('../models/movieModel')
var theatremodel=require('../models/theatreModel')
var usermodel=require("../models/userModel")


async function getseatstatus(req,res){
    var flag=true;
    bookingmodel.bookingModel.findOne({theatreMoviePattern:req.body.pattern},(err,data)=>{
        if(data){ 
            res.send(data);
        }
        else{
            var obj=new bookingmodel.bookingModel({
                theatreMoviePattern:req.body.pattern,
                seatingStatus:["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]               
            })
            obj.save((err,data)=>{
                res.send(data);
            })
        }
        
    })
}




 
async function booknow(req,res){
    let movieData=await moviemodel.movieModel.findOne({movieId:req.body.movieId});
    let theatreData=await theatremodel.theatreModel.findOne({theatreId:req.body.theatreId})
    await moviemodel.movieModel.updateOne({movieId:req.body.movieId},{$inc:{bookings:req.body.bookings}})
    await theatremodel.theatreModel.updateOne({theatreId:req.body.theatreId},{$inc:{bookings:req.body.bookings}})
    var obj={
        movieName:movieData.name,
        theatreName:theatreData.theatreName,
        price:req.body.price,
        seatsBooked:req.body.bookings,
        movieImage:movieData.cardImage
    }
    var arr=req.body.changedseats;
    // bookingmodel.bookingModel.findOne({pattern:req.body.pattern},(err,data)=>{
    //     console.log(data);
    // })
    await bookingmodel.bookingModel.updateOne({theatreMoviePattern:req.body.pattern},{$set:{seatingStatus:arr}});
    usermodel.userModel.updateOne({email:req.body.curremail},{$push:{movieHistory:obj}},(err,data)=>{
        res.send("Booked");
    })
}



module.exports={getseatstatus,booknow};