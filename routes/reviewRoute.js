var reviewController=require("../controllers/reviewController")
var reviewRoute=require("express").Router()


reviewRoute.post("/addreview",reviewController.addreview);
reviewRoute.post("/getreviews",reviewController.getreviews)


module.exports=reviewRoute;
