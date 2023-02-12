window.onload=()=>{
    $(document).ready(()=>{
        $.get("http://localhost:3333/users/getusers",(data,status)=>{
            addUsersToAdminPage(data);
        })
        $.get("http://localhost:3333/queries/getqueries",(data,status)=>{
            addQueriesToAdmin(data);
        })
        $.post("http://localhost:3333/theatres/getacceptedtheatres",{ownerEmail:localStorage.getItem("currentLoginUser")},(data,status)=>{
            addAcceptedTheatrestoAdmin(data);
        })
    })

}

function addAcceptedTheatrestoAdmin(obj){
    for(x in obj){
        $("#theatretablebody").append(
            `<tr>
                <td>${obj[x].theatreId}</td>
                <td>${obj[x].ownerEmail}</td>
                <td>${obj[x].theatreName}</td>
                <td>${obj[x].location}</td>
                <td>${obj[x].category}</td>
                <td style="cursor:pointer;padding:10px;background-color:red;" onclick="removetheatrefromtheatresadmin('${obj[x].ownerEmail}')">Remove</td>
            </tr>`
        )
    }
    
}

function removetheatrefromtheatresadmin(ownerEmail){
    $.post("http://localhost:3333/theatres/removetheatre",{ownerEmail:ownerEmail},(xhr,status,responseText)=>{
        alert(responseText.responseText)
    })
}


function addUsersToAdminPage(obj){
    var x=1;
    for(key in obj){
        var ele=document.createElement('tr');
        ele.innerHTML=`<td>${x}</td><td>${obj[key].name}</td><td>${obj[key].mobile}</td><td>${obj[key].email}</td>`;
        x++;
        $("#userdata").append(ele);
    }
}


function addQueriesToAdmin(obj){
    for(k in obj){
        var ele=document.createElement('tr');
        ele.innerHTML=`<td>${obj[k].name}</td><td>${obj[k].email}</td><td>${obj[k].subject}</td><td>${obj[k].message}</td>`;
        $("#enquiries").append(ele);
    }      
}

function displayUsers(){
    $("#usersData").css("display","table")
    $("#addMoviesData").css("display","none")
    $("#addTheatresData").css("display","none")
    $("#enquiries").css("display","none")
}


function displayMovies(){
    $("#usersData").css("display","none")
    $("#addMoviesData").css("display","block")
    $("#addTheatresData").css("display","none")
    $("#enquiries").css("display","none")
}


function displayqueries(){
    $("#usersData").css("display","none")
    $("#addMoviesData").css("display","none")
    $("#addTheatresData").css("display","none")
    $("#enquiries").css("display","table")
}

function displayTheatres(){
    $("#usersData").css("display","none")
    $("#addMoviesData").css("display","none")
    $("#addTheatresData").css("display","block")
    $("#enquiries").css("display","none")
    
    $.get("http://localhost:3333/theatres/gettheatre/category A",(data,status)=>{
        var obj=data;
        for(x in obj)
        {   
            $("#a").append(`<tr class="inner-box" id="child+${obj[x].ownerEmail}">
            <th scope="row1">
            <div class="event-date">
            <span>${obj[x].theatreId}</span>
            </div>
            </th>
            <td>
            <div class="event-img">
            <img src="img/myimgs/${obj[x].theatreImage}" alt="" />
            </div>
            </td>
            <td>
            <div class="event-wrap">
            <h3><a href="#">${obj[x].theatreName}</a></h3>
            </div>
            </td>
            <td>
            <div class="r-no">
            <span>${obj[x].location}</span>
            </div>
            </td>
            <td>
            <div>
            <div onclick="accepttheatre('${obj[x].ownerEmail}')"><div class="btn btn-primary" on style="background-color: green;">Accept</div></div> 
            <div onclick="rejecttheatre('${obj[x].ownerEmail}')"><div class="btn btn-primary" style="background-color: red;" >Reject</div></div> 
            </td>
        </tr>`)
        }
    })

}


function accepttheatre(ownerEmail){
    if(localStorage.getItem("theatreemails")==null){
        localStorage.setItem(ownerEmail,"1")
    }
    $.post("http://localhost:3333/theatres/accepttheatre",{ownerEmail:ownerEmail},(xhr,status,responseText)=>{
        alert(responseText.responseText);
    })

}


function rejecttheatre(ownerEmail){
    alert(100);
    $.post("http://localhost:3333/theatres/rejecttheatre",{ownerEmail:ownerEmail},(xhr,status,responseText)=>{
        alert(responseText.responseText);
    })
}



var theatreArr=[]
var movieArr=[]

$(document).ready(()=>{
    $("#theatreSaveAndAddBtn").click(()=>{
        var obj={
            theatre:$("#addTheatreSelect").val(),
            price:$("#theatrePrice").val(),
            startDate:$("#theatreStartDate").val(),
            endDate:$("#theatreEndDate").val()
        }
        theatreArr.push(obj);
        $("#addTheatreSelect").val("null1"),
        $("#theatrePrice").val(null),
        $("#theatreStartDate").val(null),
        $("#theatreEndDate").val(null)
    })
    $("#addMovieBtn").click(()=>{
        var theatreObjects=[]
        for(i in theatreArr){
            theatreObjects.push(theatreArr[i]);
        }
        var obj={
            movieId:$("#addMovieId").val(),
            name:$("#addMovieName").val(),
            cardImage:$("#addMovieImUrl").val(),
            coverImage:$("#addMovieCoverImUrl").val(),
            description:$("#addMovieDescription").val(),
            category:$("#addMovieCategory").val(),
            format:$("#addMovieFormat").val(),
            duration:$("#addMovieDuration").val(),
            language:$("#addMovieLang").val(),
            bookings:0,
            theatreObjects:theatreObjects
        }
        $.post("http://localhost:3333/movies/addmovie",obj,(xhr,status,responseText)=>{
            alert(responseText.responseText);
            window.location.href="admin.html";
        })
    })

    
    
    
    
})



$(document).ready(()=>{
    $("#MovieSaveAndAddBtn").click(()=>{
        var obj={
            movie:$("#addMovieSelect").val(),
            price:$("#moviePrice").val(),
            startDate:$("#movieStartDate").val(),
            endDate:$("#movieEndDate").val()
        }
        movieArr.push(obj);
        $("#addMovieSelect").val("null")
        $("#moviePrice").val("null");
        $("#movieStartDate").val("null");
        $("#movieEndDate").val("null")
    })
    $("#addTheatreBtn").click(()=>{
        var movieObjects=[]
        for(x in movieArr){
            movieObjects.push(movieArr[x])
        }
        var obj={
            theatreId:$("#addTheatreId").val(),
            name:$("#addTheatreName").val(),
            theatreImage:$("#addTheatreImUrl").val(),
            location:$("#addTheatreLocation").val(),
            bookings:0,
            movieObjects:movieObjects,
        }
        $.post("http://localhost:3333/theatres/addtheatre",obj,(xhr,status,responseText)=>{
            alert(responseText.responseText);
            window.location.href="admin.html";
        })
    })



    $("#category_b").click(function(){
        $.get("http://localhost:3333/theatres/gettheatre/category B",(data,status)=>{
        var obj=data;
        for(x in obj)
        {
            $("#b").append(`<tr class="inner-box">
            <th scope="row1">
            <div class="event-date">
            <span>${obj[x].theatreId}</span>
            </div>
            </th>
            <td>
            <div class="event-img">
            <img src="img/myimgs/${obj[x].theatreImage}" alt="" />
            </div>
            </td>
            <td>
            <div class="event-wrap">
            <h3><a href="#">${obj[x].theatreName}</a></h3>
            </div>
            </td>
            <td>
            <div class="r-no">
            <span>${obj[x].location}</span>
            </div>
            </td>
            <td>
            <div class="primary-btn">
            <div onclick="accepttheatre('${obj[x].ownerEmail}')"><div class="btn btn-primary" on style="background-color: green;">Accept</div></div> 
            <div onclick="rejecttheatre('${obj[x].ownerEmail}')"><div class="btn btn-primary" style="background-color: red;" >Reject</div></div> 
            </td>
        </tr>`)
        }
    })
    })

    $("#category_c").click(function(){
        $.get("http://localhost:3333/theatres/gettheatre/category C",(data,status)=>{
        var obj=data;
        for(x in obj)
        {
            $("#c").append(`<tr class="inner-box">
            <th scope="row1">
            <div class="event-date">
            <span>${obj[x].theatreId}</span>
            </div>
            </th>
            <td>
            <div class="event-img">
            <img src="img/myimgs/${obj[x].theatreImage}" alt="" />
            </div>
            </td>
            <td>
            <div class="event-wrap">
            <h3><a href="#">${obj[x].theatreName}</a></h3>
            </div>
            </td>
            <td>
            <div class="r-no">
            <span>${obj[x].location}</span>
            </div>
            </td>
            <td>
            <div class="primary-btn">
            <div onclick="accepttheatre('${obj[x].ownerEmail}')"><div class="btn btn-primary" on style="background-color: green;">Accept</div></div> 
            <div onclick="rejecttheatre('${obj[x].ownerEmail}')"><div class="btn btn-primary" style="background-color: red;" >Reject</div></div> 
            </td>
        </tr>`)
        }
    })
    })

    $("#category_d").click(function(){
        $.get("http://localhost:3333/theatres/gettheatre/category D",(data,status)=>{
        var obj=data;
        for(x in obj)
        {
            $("#d").append(`<tr class="inner-box">
            <th scope="row1">
            <div class="event-date">
            <span>${obj[x].theatreId}</span>
            </div>
            </th>
            <td>
            <div class="event-img">
            <img src="img/myimgs/${obj[x].theatreImage}" alt="" />
            </div>
            </td>
            <td>
            <div class="event-wrap">
            <h3><a href="#">${obj[x].theatreName}</a></h3>
            </div>
            </td>
            <td>
            <div class="r-no">
            <span>${obj[x].location}</span>
            </div>
            </td>
            <td>
            <div class="primary-btn">
            <div onclick="accepttheatre('${obj[x].ownerEmail}')"><div class="btn btn-primary" on style="background-color: green;">Accept</div></div> 
            <div onclick="rejecttheatre('${obj[x].ownerEmail}')"><div class="btn btn-primary" style="background-color: red;" >Reject</div></div> 
            </td>
        </tr>`)
        }
    })
    })

    $("#theatres-background").click(function()
    {
        $("#theatres-background").css({backgroundColor:"#404e67"})
        $("#users-background").css({backgroundColor:"white"})
        $("#enquiries-background").css({backgroundColor:"white"})
        $(".theatres-text").css({color:"white"})
        $(".users-text").css({color:"#012970"})
        $(".enquiries-text").css({color:"#012970"})

    })
    $("#users-background").click(function()
    {
        $("#theatres-background").css({backgroundColor:"white"})
        $("#users-background").css({backgroundColor:"#404e67"})
        $("#enquiries-background").css({backgroundColor:"white"})
        $(".theatres-text").css({color:"#012970"})
        $(".users-text").css({color:"white"})
        $(".enquiries-text").css({color:"#012970"})
    })
    $("#enquiries-background").click(function()
    {
        $("#theatres-background").css({backgroundColor:"white"})
        $("#users-background").css({backgroundColor:"white"})
        $("#enquiries-background").css({backgroundColor:"#404e67"})
        $(".theatres-text").css({color:"#012970"})
        $(".users-text").css({color:"#012970"})
        $(".enquiries-text").css({color:"white"})
    })



})



$(document).ready(()=>{
    $("#submitTheatre").click(()=>{
        if(localStorage.getItem("movieId")==null){
            localStorage.setItem("movieId",1);
        }
        var obj={
            movieId:localStorage.getItem("movieId"),
            cardImage:$("#movie_image").val(),
            coverImage:$("#cover_image").val(),
            name:$("#movie_name").val(),
            category:$("#category").val(),
            duration:$("#duration").val(),
            languages:$("#language").val(),
            format:$("#format").val(),
            description:$("#description").val(),
            bookings:0,
            access:"true"
        }
        $.post("http://localhost:3333/movies/addmovie",obj,(xhr,status,responseText)=>{
            alert(responseText.responseText);
        })
        localStorage.setItem("movieId",parseInt(localStorage.getItem("movieId"))+1);
    })
})