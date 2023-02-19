window.onload=()=>{

    $.post("http://localhost:3333/movies/getownermovies",{curremail:localStorage.getItem("currentLoginUser")},(xhr,status,responseText)=>{
        var arr=JSON.parse(responseText.responseText);
        for(x in arr){
            obj=arr[x];
            var ele=document.createElement("li");
            ele.className="list-group-item pt-0";
            ele.id=obj.movieId;
            ele.innerHTML="<div class='d-flex align-items-center'><div class='flex-shrink-0 me-3'><img src='../"+obj.movieImg+"'"+" alt='' class='avatar rounded-circle' /></div><div class='flex-grow-1'><h6 class='mb-0' id='existingMovieName'>"+obj.movieName+"</h6></div><div class='flex-shrink-0 text-end'><span><div ><a class='btn btn-primary' style='background-color: red;' href='#' onclick=deletemoviefromtheatre("+obj.movieId+")>Remove</a></div></span></div></div>  "    
            $("#nowshowingcontainer").append(ele);
        }
    })

    $.post("http://localhost:3333/movies/getexistingmovies",{curremail:localStorage.getItem("currentLoginUser")},(xhr,status,responseText)=>{
        // alert(responseText.responseText)
        var arr=JSON.parse(responseText.responseText);
        for(x in arr){
            obj=arr[x];
            var ele=document.createElement("li");
            ele.className="list-group-item pt-0";
            ele.id=obj.movieId;
            ele.innerHTML="<div class='d-flex align-items-center'><div class='flex-shrink-0 me-3'><img src='../"+obj.cardImage+"'"+" alt='' class='avatar rounded-circle' /></div><div class='flex-grow-1'><h6 class='mb-0' id='existingMovieName'>"+obj.name+"</h6></div><div class='flex-shrink-0 text-end'><span><div ><a class='btn btn-primary' style='background-color: green;' href='#' onclick=addexistingmovie("+obj.movieId+")>+Add Movie</a></div></span></div></div>  "    
            $("#existingMovieContainer").append(ele);
        }
    })

    $.get("http://localhost:3333/movies/getmovies", (data, status) => {
        addMoviesToAdmin(data);
    })



}

function addMoviesToAdmin(arr) {
    for(x in arr){
        obj=arr[x];
        var ele=document.createElement("li");
        ele.className="list-group-item pt-0";
        ele.id=obj.movieId;
        ele.innerHTML="<div class='d-flex align-items-center'><div class='flex-shrink-0 me-3'><img src='../"+obj.cardImage+"'"+" alt='' class='avatar rounded-circle' /></div><div class='flex-grow-1'><h6 class='mb-0' id='existingMovieName'>"+obj.name+"</h6></div><div class='flex-shrink-0 text-end'><span><div ><a class='btn btn-primary'  href='reviews.html#"+obj.movieId+"'>See Reviews</a></div></span></div></div>  "    
        $("#seereviewscontainer").append(ele);
    }
    // for (x in arr) {
    //     obj = arr[x];
    //     var ele = document.createElement("div");
    //     ele.className = "list-group-item pt-0";
    //     ele.id = obj.movieId;
    //     ele.innerHTML = `<div style="display: flex;flex-direction: column;border: 1px solid black;">
    //         <img src="../${obj.cardImage}">
    //         <div>${obj.name}</div>
    //         <a href="reviews.html#${obj.movieId}"+>Reviews</a>
    //         <div onclick="deletemovie('${obj.movieId}')">Remove Movie</div>
    //     </div>`
    //     $("#seereviewscontainer").append(ele);
    // }
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
    $("#addMoviesData").css("display","none")
    $("#movieStatus").css("display","block")
    $("#seereviews").css("display","none")
}
function addMovies(){
    $("#addMoviesData").css("display","block")
    $("#movieStatus").css("display","none")
    $("#seereviews").css("display","none")
}


function displayreviews(){
    $("#addMoviesData").css("display","none")
    $("#movieStatus").css("display","none")
    $("#seereviews").css("display","block")
}

$(document).ready(function() {
  $("#theatreRegister").click(function() {
    $("#form1").toggle();
        });
    }
);