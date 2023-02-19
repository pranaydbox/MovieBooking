var movieRoute=require("express").Router()
var movieController=require("../controllers/movieController")
var upload=require('../multerOperations/multer').upload

movieRoute.post("/addmovie",upload.fields([{name:"cardImage",maxCount:1},{name:"coverImage",maxCount:1}]),movieController.addmovie);
movieRoute.get("/getmovies",movieController.getmovies);
movieRoute.get("/getmovie/:id",movieController.getmovie);
movieRoute.post("/addexisting/:id",movieController.addexisting)
movieRoute.post("/getownermovies",movieController.getownermovies)
movieRoute.post("/removeownermovie",movieController.removeownermovie)
movieRoute.get("/gettopsixmovies",movieController.gettopsixmovies)
movieRoute.post("/getexistingmovies",movieController.getexistingmovies)
movieRoute.post("/removemovie",movieController.removemovie)
movieRoute.get("/getmoviesbylanguages",movieController.getmoviesbylanguages)
movieRoute.get("/getmoviesbycategories",movieController.getmoviesbycategories)
module.exports=movieRoute;