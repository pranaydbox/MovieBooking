window.onload=()=>{

    $.post("http://localhost:3333/movies/getownermovies",{curremail:localStorage.getItem("currentLoginUser")},(xhr,status,responseText)=>{
        var arr=JSON.parse(responseText.responseText);
        for(x in arr){
            obj=arr[x];
            var ele=document.createElement("li");
            ele.className="list-group-item pt-0";
            ele.id=obj.movieId;
            ele.innerHTML="<div class='d-flex align-items-center'><div class='flex-shrink-0 me-3'><img src='./img/myimgs/"+obj.movieImg+"'"+" alt='' class='avatar rounded-circle' /></div><div class='flex-grow-1'><h6 class='mb-0' id='existingMovieName'>"+obj.movieName+"</h6></div><div class='flex-shrink-0 text-end'><span><div ><a class='btn btn-primary' style='background-color: red;' href='#' onclick=deletemoviefromtheatre("+obj.movieId+")>Remove</a></div></span></div></div>  "    
            $("#nowshowingcontainer").append(ele);
        }
    })

    $.post("http://localhost:3333/movies/getexistingmovies",{curremail:localStorage.getItem("currentLoginUser")},(xhr,status,responseText)=>{
        var arr=JSON.parse(responseText.responseText);
        for(x in arr){
            obj=arr[x];
            var ele=document.createElement("li");
            ele.className="list-group-item pt-0";
            ele.id=obj.movieId;
            ele.innerHTML="<div class='d-flex align-items-center'><div class='flex-shrink-0 me-3'><img src='./img/myimgs/"+obj.cardImage+"'"+" alt='' class='avatar rounded-circle' /></div><div class='flex-grow-1'><h6 class='mb-0' id='existingMovieName'>"+obj.name+"</h6></div><div class='flex-shrink-0 text-end'><span><div ><a class='btn btn-primary' style='background-color: green;' href='#' onclick=addexistingmovie("+obj.movieId+")>+Add Movie</a></div></span></div></div>  "    
            $("#existingMovieContainer").append(ele);
        }
    })



}




function addexistingmovie(movieId){
    $.post("http://localhost:3333/movies/addexisting/"+movieId,{curremail:localStorage.getItem("currentLoginUser")},(xhr,status,responseText)=>{
        alert(responseText.responseText);
    })
}

function deletemoviefromtheatre(movieId){
    alert(movieId);
    $.post("http://localhost:3333/movies/removeownermovie",{curremail:localStorage.getItem("currentLoginUser"),movieId:movieId},(xhr,status,responseText)=>{
        alert(responseText.responseText);
    })
}


function displayMovieStatus(){
    $("#usersData").css("display","none")
    $("#addMoviesData").css("display","none")
    $("#movieStatus").css("display","block")
    $("#enquiries").css("display","none")
}
function addMovies(){
    $("#usersData").css("display","none")
    $("#addMoviesData").css("display","block")
    $("#movieStatus").css("display","none")
    $("#enquiries").css("display","none")
}

$(document).ready(function() {
  $("#theatreRegister").click(function() {
    $("#form1").toggle();
        });
    }
);