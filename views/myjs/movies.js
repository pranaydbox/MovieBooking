window.onload=()=>{
    $(document).ready(()=>{
        $.get("http://localhost:3333/movies/getmovies",(data,status)=>{
            addMoviesTopage(data);
        })
    })    
    // $.get("http://localhost:3333/movies/gettopsixmovies",(data,status)=>{
    //     addTop3MoviesCarousel(data);
    // })
}


function addTop3MoviesCarousel(obj){
    for(var i=0;i<2;i++){
        $("#moviesTop3Carousel").append(
            `<div class="single-carusel">
                <div class="thumb relative">
                <div class="overlay overlay-bg"></div>
                    <img class="img-fluid" src="img/tempCover.jpg" alt="">
                </div>
                <div class="price-detials">
                    <a href="#" class="price-btn">Starting From <span>$250</span></a>
                </div>
                <div class="details">
                    <h4 class="text-white">Ancient Architecture</h4>
                    <p class="text-white">
                        Cairo, Egypt
                    </p>
                </div>								
			</div>`
        )
    }
}



function addMoviesTopage(obj){
    for(x in obj){
        data=obj[x];
        console.log(data);
        var ele=document.createElement("div");
        ele.innerHTML="<div class='single-destinations' style='display:flex;flex-direction:column;background-color:white;cursor:pointer;justify-content:center;align-items:center;border-radius:20px'><div class='thumb' onclick='show("+data.movieId+")'><img style='border-top-left-radius: 20px;border-top-right-radius:20px' src=img/myimgs/"+data.cardImage+" alt=''></div><div id='movieCardName' style='color:black;font-size:15px;font-weight: bold;padding:2px'>"+data.name+"</div><div id='movieCardSubTags' style='color:black'>"+data.languages+"/"+data.category+"</div><div style='font-size:20px;border:1px solid white;width:100%;text-align:center;padding:6px;font-weight:normal;border-bottom-left-radius: 20px;border-bottom-right-radius:20px;background:linear-gradient(to right,grey,black,grey);color:white'>Book Ticket</div></div>"
        ele.className="col-lg-3 movieCard";
        ele.id=data.movieId;    
        $("#moviesBodyContainer").append(ele);
    }
}

function show(id){
    location.href="movie.html#"+id;
}
