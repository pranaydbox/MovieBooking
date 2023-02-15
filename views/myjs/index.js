window.onload=function(){
    
    //add top 3 theatres
    $.get("http://127.0.0.1:3333/theatres/gettopthreetheatres",(data,status)=>{
        addtop3theatres(data);
    })
    $.get("http://127.0.0.1:3333/movies/gettopsixmovies",(data,status)=>{
    
        addtop6movies(data);
    })

}
function addtop3theatres(obj)
{
    for(x in obj)
    {
        $("#top3theatres").append(
            `<div class="col-lg-4">
            <div class="single-destination relative">
                <div class="thumb relative">
                    <div class="overlay overlay-bg"></div>
                    <img class="img-fluid" src="../${obj[x].theatreImage}" alt="">
                </div>
                <div class="desc">	
                    <a href="#" class="price-btn">$150</a>			
                    <h4>${obj[x].theatreName}</h4>
                    <p>${obj[x].location}</p>			
                </div>
            </div>
        </div>`
        )
    }
}
function addtop6movies(obj)
{
    for(x in obj){
        $("#top6movies").append(
            
            `<div class="col-lg-4">
            <div class="single-destination relative">
                <div class="thumb relative">
                    <div class="overlay overlay-bg"></div>
                    <img class="img-fluid" src="../${obj[x].coverImage}" alt="">
                </div>
                <div class="desc">	
                    <a href="#" class="price-btn">Book now</a>			
                    <h4>${obj[x].name}</h4>
                    <p>${obj[x].category}</p>			
                </div>
            </div>
        </div>`
            
        )
    }
    $("#top6movies").carousel()
}