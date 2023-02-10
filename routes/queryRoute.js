var queryController=require("../controllers/queryController")
var queryRoute=require("express").Router()


queryRoute.post("/addqueries",queryController.addqueries);
queryRoute.get("/getqueries",queryController.getqueries)

module.exports=queryRoute;