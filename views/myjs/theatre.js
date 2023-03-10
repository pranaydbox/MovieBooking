window.onload=function(){
    $.get("http://localhost:3333/theatres/gettheatres",(data,status)=>{
        for(x in data){
            obj=data[x];
            var temp=`<select style="background-color:black;color:white" id='movieSelect${obj.theatreId}'>`
            for(x in obj.movieObjects){
                d=obj.movieObjects[x];
                temp=temp+`<option value="${d.movieId}">${d.movieName}</option>`;
            }
            temp=temp+"<select>"
            $("#theatresOnloadContainer").append(
                `<div class="col-lg-4" style="color:white;">
                <div class="single-destinations" style="box-shadow:2px 1px 10px 2px grey;">
                    <div class="thumb">
                        <img src="../${obj.theatreImage}" alt="">
                    </div>
                    <div class="details" style="background-color:black;">
                        <h4 class="d-flex justify-content-between" style="color:white">
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
                            <li class="d-flex justify-content-between align-items-center" style="background-color:black;">
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