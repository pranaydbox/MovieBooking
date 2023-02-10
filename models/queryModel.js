var conn=require("./connection")
var db=conn.db
var mongoose=conn.mongoose

var querySchema={
    name:{type:String},
    email:{type:String},
    subject:{type:String},
    message:{type:String}
}

var queryModel=mongoose.model("queries",querySchema);

module.exports={queryModel}