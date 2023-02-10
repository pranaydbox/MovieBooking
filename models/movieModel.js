var conn=require("./connection")
var db=conn.db
var mongoose=conn.mongoose

var movieSchema={
    movieId:{type:String},
    cardImage:{type:String},
    coverImage:{type:String},
    name:{type:String},
    category:{type:String},
    duration:{type:Number},
    languages:{type:String},
    format:{type:String},
    description:{type:String},
    bookings:{type:Number},
    access:{type:String},
    theatreObjects:[{theatreId:{type:String},theatreName:{type:String},category:{type:String},location:{type:String}}]
}


var movieModel=mongoose.model("movies",movieSchema)

module.exports={movieModel};