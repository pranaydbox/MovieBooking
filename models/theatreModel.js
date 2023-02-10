var conn=require("./connection")
var db=conn.db
var mongoose=conn.mongoose

var theatreSchema={
    theatreId:{type:String},
    theatreName:{type:String},
    ownerEmail:{type:String},
    category:{type:String},
    theatreImage:{type:String},
    location:{type:String},
    bookings:{type:Number},
    access:{type:String},
    movieObjects:[{movieId:{type:String},movieName:{type:String},movieImg:{type:String}}],
    beverageObjects:[{beverage:{type:String},price:{type:Number}}]
}

theatreModel=mongoose.model("theatres",theatreSchema)

module.exports={theatreModel} 