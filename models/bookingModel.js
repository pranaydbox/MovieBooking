var conn=require("./connection")
var db=conn.db
var mongoose=conn.mongoose

var bookingSchema={
    theatreMoviePattern:{type:String},
    seatingStatus:[]
}

bookingModel=mongoose.model("bookings",bookingSchema);

module.exports={bookingModel}


