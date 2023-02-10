var theatreRoute=require("express").Router()
var theatreController=require("../controllers/theatreController")


theatreRoute.post("/addtheatre",theatreController.addtheatre)
theatreRoute.post("/accepttheatre",theatreController.accepttheatre)
theatreRoute.get("/gettheatre/:category",theatreController.gettheatre)
theatreRoute.post("/getacceptedtheatres",theatreController.getacceptedtheatres);
theatreRoute.post("/removetheatre",theatreController.removetheatre);
theatreRoute.get("/gettheatres",theatreController.gettheatres)
theatreRoute.get("/gettopthreetheatres",theatreController.gettopthreetheatres)
theatreRoute.post("/rejecttheatre",theatreController.rejecttheatre)
theatreRoute.post("/getacceptedtheatres",theatreController.getacceptedtheatres);


module.exports=theatreRoute;