var movieRoute=require("express").Router()
var movieController=require("../controllers/movieController")

movieRoute.post("/addmovie",movieController.addmovie);
movieRoute.get("/getmovies",movieController.getmovies);
movieRoute.get("/getmovie/:id",movieController.getmovie);
movieRoute.post("/addexisting/:id",movieController.addexisting)
movieRoute.post("/getownermovies",movieController.getownermovies)
movieRoute.post("/removeownermovie",movieController.removeownermovie)
movieRoute.get("/gettopsixmovies",movieController.gettopsixmovies)
movieRoute.post("/getexistingmovies",movieController.getexistingmovies)
movieRoute.post("/removemovie",movieController.removemovie)


module.exports=movieRoute;