window.onload=function(){
    $.get("http://localhost:3333/theatres/gettheatres",(data,status)=>{
        for(x in data){
            obj=data[x];
            var temp=`<select id='movieSelect${obj.theatreId}'>`
            for(x in obj.movieObjects){
                d=obj.movieObjects[x];
                temp=temp+`<option value="${d.movieId}">${d.movieName}</option>`;
            }
            temp=temp+"<select>"
            $("#theatresOnloadContainer").append(
                `<div class="col-lg-4" style="color:black">
                <div class="single-destinations" >
                    <div class="thumb">
                        <img src="img/myimgs/${obj.theatreImage}" alt="">
                    </div>
                    <div class="details">
                        <h4 class="d-flex justify-content-between" style="color:black">
                            <span>${obj.theatreName}</span>                              	
                            <div class="star">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>				
                            </div>	
                        </h4>
                        <p>
                            View on map   |   49 Reviews
                        </p>
                        <ul class="package-list">
                            

                            <li class="d-flex justify-content-between align-items-center">
                                <span>Location</span>
                                <span>${obj.location}</span>
                            </li>
                            <li class="d-flex justify-content-between align-items-center" >
                                ${temp}
                            </li>
                           
                            <li class="d-flex justify-content-center align-items-center">
                                <!-- <span>Price per night</span> -->
                                <a href="#" onclick="bookmoviefromtheatrebutton(${'obj.theatreId'})" class="price-btn">Book Tickets</a>
                            </li>													
                        </ul>
                    </div>
                </div>
            </div>`
        
        )}
    })
}

function bookmoviefromtheatrebutton(theatreId){
    window.location.href="booking.html"+"#"+$(`#movieSelect${theatreId}`).val()+":"+theatreId;
}