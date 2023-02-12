var reviewController=require("../controllers/reviewController")
var reviewRoute=require("express").Router()


reviewRoute.post("/addreview",reviewController.addreview);


module.exports=reviewRoute;
