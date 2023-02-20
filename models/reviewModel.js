var conn=require("./connection")
var db=conn.db
var mongoose=conn.mongoose

var reviewSchema={
    movieId:{type:String},
    reviews:[{name:{type:String},email:{type:String},rating:{type:Number},review:{type:String},date:{type:Date},userimage:{type:String}}]
}

var reviewModel=mongoose.model("reviews",reviewSchema);


module.exports={reviewModel,reviewSchema};