const mongoose=require("mongoose")
const url="mongodb+srv://MovieFlix:MovieFlix@movieflix.jd9qkbh.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise=global.Promise
mongoose.connect(url)
var db=mongoose.connection
db.on('error',console.error.bind(console,'DB Error:'))

module.exports={db,mongoose}