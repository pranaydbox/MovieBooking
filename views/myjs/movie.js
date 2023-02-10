window.onload=()=>{
    var hash=window.location.hash.substring(1);
    
    $.get("http://localhost:3333/movies/getmovie/"+hash,(data,status)=>{
        $("#movieCardImage").attr("src","./img/myimgs/"+data.cardImage);
        $("#movieCardName").html(data.name);
        $("#movieCardDescription").html(data.description);
        var url="./img/myimgs/"+data.coverImage;
        $("#MoviePageBody").css({"background":"linear-gradient(to left, rgba(0,0,0, 0) 35%, rgb(12, 12, 12),rgba(0,0,0,1)),"+"url("+url+")","background-repeat":"no-repeat","background-size": "100%","z-index": "100", "height":"auto"})
        $("#movieCardDescriptionFormat").html(data.category+". "+data.format);
        $("#movieCardDurationLanguagestartDate").html(data.duration+". "+data.languages);
        addtheatres(data.theatreObjects,"Hyderabad");
    })

}



function addtheatres(data,location){
    for(x in data){
        obj=data[x];
        var ele=document.createElement("div");
        ele.innerHTML="<div>"+obj.theatreName+"</div><div>"+obj.location+"</div><div>"+obj.category+"</div> <div style='border-radius:10px;background-color: greenyellow;padding: 15px;cursor:pointer' onclick='bookmoviefrommovies("+obj.theatreId+","+window.location.hash.substring(1)+")'>Book Now!</div>"
        ele.className="col-lg-12";
        ele.style="display:flex;flex-direction: row;gap:10px;padding:30px;justify-content: space-evenly;border-top: 1px solid black;align-items: center;";
        $("#theatreRow").append(ele);
    }
}


function bookmoviefrommovies(theatreId,movieId){
    window.location.href="booking.html#"+movieId+":"+theatreId;
}