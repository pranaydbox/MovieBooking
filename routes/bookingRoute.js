var bookingController=require("../controllers/bookingController")


var bookingRoute=require('express').Router()

bookingRoute.post("/getseatstatus",bookingController.getseatstatus);
bookingRoute.post("/booknow",bookingController.booknow)


module.exports=bookingRoute;