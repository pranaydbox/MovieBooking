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

    $.post("http://localhost:3333/theatres/gettheatreDetails",{curremail:localStorage.getItem("currentLoginUser")},(xhr,status,responseText)=>{
        console.log(responseText)
        var arr=JSON.parse(responseText.responseText);
        console.log(arr)
        console.log(arr[0])
        var price = { "category D": 120, "category C": 150, "category B": 180, "category A": 200 }
        $("#TheatreName").append(arr[0].theatreName)
        $("#TheatreLocation").append(arr[0].location)
        $("#theatreCardImage").attr("src","../../"+arr[0].theatreImage);
        $("#moviesCount").append(arr[0].movieObjects.length)
        $("#bookedseats").append(arr[0].bookings)
        var cat=arr[0].category
        var rev=price[cat]*arr[0].bookings
        $("#revenue").append(rev)

    })



}

function addMoviesToAdmin(arr) {
    for(x in arr){
        obj=arr[x];
        var ele=document.createElement("li");
        ele.className="list-group-item pt-0";
        ele.id=obj.movieId;
        ele.innerHTML=`<div class="card mb-3">
        <div class="card-body">
          <div class="d-flex flex-column flex-lg-row">
            <img class="avatar avatar-text rounded-3 me-4 mb-2" src="../${obj.cardImage}" id="">
            <div class="row flex-fill">
              <div class="col-sm-5">
                <h4 class="h5">${obj.name}</h4>
                <span class="badge bg-success" style="width: 50%;height:20%;"><span>$</span></span>
                </div>
              <div class="col-sm-4 py-2">
              <a href="#" class="btn btn-primary stretched-link" style="background-color: orange;"><span>Bookings:</span></a>
              </div>
              <div class="col-sm-3 text-lg-end">
                <a href="reviews.html#${obj.movieId}" class="btn btn-primary stretched-link">See Reviews</a>
              </div>
            </div>
          </div>
        </div>
      </div>`
        //ele.innerHTML="<div class='d-flex align-items-center'><div class='flex-shrink-0 me-3'><img src='../"+obj.cardImage+"'"+" alt='' class='avatar rounded-circle' /></div><div class='flex-grow-1'><h6 class='mb-0' id='existingMovieName'>"+obj.name+"</h6></div><div class='flex-shrink-0 text-end'><span><div ><a class='btn btn-primary'  href='reviews.html#"+obj.movieId+"'>See Reviews</a></div></span></div></div>  "    
        $("#seereviewscontainer").append(ele);
    }
    
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