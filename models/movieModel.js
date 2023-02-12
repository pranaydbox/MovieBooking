var conn=require("./connection")
var reviewmodel=require("./reviewModel")
var db=conn.db
var mongoose=conn.mongoose

var movieSchema={
    movieId:{type:String},
    cardImage:{type:String},
    coverImage:{type:String},
    name:{type:String},
    category:{type:Array},
    duration:{type:Number}, 
    languages:{type:Array},
    format:{type:Array},
    description:{type:String},
    bookings:{type:Number},
    access:{type:String},
    startDate:{type:Date},
    theatreObjects:[{theatreId:{type:String},theatreName:{type:String},category:{type:String},location:{type:String}}],
    reviewObjects:reviewmodel.reviewSchema.reviews
}


var movieModel=mongoose.model("movies",movieSchema)

module.exports={movieModel};