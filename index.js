var express=require('express')
var app=express()
var bodyParser  = require('body-parser');
app.use(bodyParser.json())
app.use(express.urlencoded())

var cors=require('cors')
app.use(cors())

// var multer=require('multer')
// var upload=multer()
// app.use(upload.array()); 

// app.use(express.static('./public'));
// app.use('/uploads', express.static('uploads'));


var usersRouter=require("./routes/usersRoute");
app.use("/users",usersRouter)

var queryRouter=require("./routes/queryRoute");
app.use("/queries",queryRouter)


var movieRouter=require("./routes/movieRoute")
app.use("/movies",movieRouter)

var theatreRouter=require("./routes/theatreRoute")
app.use("/theatres",theatreRouter)


var bookingRouter=require("./routes/bookingRoute");
app.use("/bookings",bookingRouter);


var reviewRouter=require("./routes/reviewRoute");
app.use("/reviews",reviewRouter);

app.listen(3333)