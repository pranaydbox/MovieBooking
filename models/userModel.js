var conn=require('./connection.js')
var db=conn.db
var mongoose=conn.mongoose

var userSchema={
    name:{type:String},
    mobile:{type:Number},
    email:{type:String},
    password:{type:String},
    dob:{type:Date},
    gender:{type:String},
    address:{type:String},
    reviews:{type:String},
    movieHistory:[{movieName:{type:String},theatreName:{type:String},price:{type:Number},seatsBooked:{type:Number}}],
    beverageHistory:{type:Array},
    owner:{type:String},
    admin:{type:String}
}

var userModel=mongoose.model("users",userSchema);

module.exports={userModel}