window.onload = () => {
    $(document).ready(() => {
        $.get("http://localhost:3333/users/getusers", (data, status) => {
            addUsersToAdminPage(data);
        })
        $.get("http://localhost:3333/queries/getqueries", (data, status) => {
            addQueriesToAdmin(data);
        })
        $.post("http://localhost:3333/theatres/getacceptedtheatres", { ownerEmail: localStorage.getItem("currentLoginUser") }, (data, status) => {
            addAcceptedTheatrestoAdmin(data);
        })
        $.get("http://localhost:3333/movies/getmovies", (data, status) => {
            addMoviesToAdmin(data);
        })
        $.get("http://localhost:3333/theatres/gettheatre/category A", (data, status) => {
            var obj = data;
            for (x in obj) {
                $("#a").append(
                    `<div class="card" style="display:flex;flex-direction:row;border-radius:0px;padding: 20px;justify-content:space-evenly;align-items: center;box-shadow: 1px 0px 3px 1px grey;background-color: black;">
                    <img src="../${obj[x].theatreImage}" class="card-img-left" style="width:100px;height:100px;border-radius:50%;">
                    <div class="card-body" style="display:flex;flex-direction:row;justify-content: space-evenly;align-items:center;margin: 0%;padding: 0%;">
                        <div style="font-size: 20px;font-weight:600;">${obj[x].theatreName}</div>
                        <div style="font-size: 20px;font-weight:600;">${obj[x].location}</div>
                        <div onclick="accepttheatre('${obj[x].ownerEmail}')" style="background-color:green;padding:8px 16px;font-size:17px" class="btn">Accept</div>
                        <div onclick="rejecttheatre('${obj[x].ownerEmail}')" style="background-color:red;padding:8px 16px;font-size:17px" class="btn">Reject</div>
                    </div>
                </div>`
                )
            }
        })
        $.get("http://localhost:3333/theatres/gettheatre/category B", (data, status) => {
            var obj = data;
            for (x in obj) {
                $("#b").append(
                    `<div class="card" style="display:flex;flex-direction:row;border-radius:0px;padding: 20px;justify-content:space-evenly;align-items: center;box-shadow: 1px 0px 3px 1px grey;background-color: black;">
                        <img src="../${obj[x].theatreImage}" class="card-img-left" style="width:100px;height:100px;border-radius:50%;">
                        <div class="card-body" style="display:flex;flex-direction:row;justify-content: space-evenly;align-items:center;margin: 0%;padding: 0%;">
                            <div style="font-size: 20px;font-weight:600;">${obj[x].theatreName}</div>
                            <div style="font-size: 20px;font-weight:600;">${obj[x].location}</div>
                            <div onclick="accepttheatre('${obj[x].ownerEmail}')" style="background-color:green;padding:8px 16px;font-size:17px" class="btn">Accept</div>
                            <div onclick="rejecttheatre('${obj[x].ownerEmail}')" style="background-color:red;padding:8px 16px;font-size:17px" class="btn">Reject</div>
                        </div>
                    </div>`
                )
            }
        })
        $.get("http://localhost:3333/theatres/gettheatre/category C", (data, status) => {
            var obj = data;
            for (x in obj) {
                $("#c").append(
                    `<div class="card" style="display:flex;flex-direction:row;border-radius:0px;padding: 20px;justify-content:space-evenly;align-items: center;box-shadow: 1px 0px 3px 1px grey;background-color: black;">
                    <img src="../${obj[x].theatreImage}" class="card-img-left" style="width:100px;height:100px;border-radius:50%;">
                    <div class="card-body" style="display:flex;flex-direction:row;justify-content: space-evenly;align-items:center;margin: 0%;padding: 0%;">
                        <div style="font-size: 20px;font-weight:600;">${obj[x].theatreName}</div>
                        <div style="font-size: 20px;font-weight:600;">${obj[x].location}</div>
                        <div onclick="accepttheatre('${obj[x].ownerEmail}')" style="background-color:green;padding:8px 16px;font-size:17px" class="btn">Accept</div>
                        <div onclick="rejecttheatre('${obj[x].ownerEmail}')" style="background-color:red;padding:8px 16px;font-size:17px" class="btn">Reject</div>
                    </div>
                </div>`
                )
            }
        })
        $.get("http://localhost:3333/theatres/gettheatre/category D", (data, status) => {
            var obj = data;
            for (x in obj) {
                $("#d").append(
                    `<div class="card" style="display:flex;flex-direction:row;border-radius:0px;padding: 20px;justify-content:space-evenly;align-items: center;box-shadow: 1px 0px 3px 1px grey;background-color: black;">
                        <img src="../${obj[x].theatreImage}" class="card-img-left" style="width:100px;height:100px;border-radius:50%;">
                        <div class="card-body" style="display:flex;flex-direction:row;justify-content: space-evenly;align-items:center;margin: 0%;padding: 0%;">
                            <div style="font-size: 20px;font-weight:600;">${obj[x].theatreName}</div>
                            <div style="font-size: 20px;font-weight:600;">${obj[x].location}</div>
                            <div onclick="accepttheatre('${obj[x].ownerEmail}')" style="background-color:green;padding:8px 16px;font-size:17px" class="btn">Accept</div>
                            <div onclick="rejecttheatre('${obj[x].ownerEmail}')" style="background-color:red;padding:8px 16px;font-size:17px" class="btn">Reject</div>
                        </div>
                    </div>`
                )
            }
        })

    })
}


function addMoviesToAdmin(arr) {
    for (x in arr) {
        obj = arr[x];
        // var ele = document.createElement("div");
        // ele.className = "list-group-item pt-0";
        // ele.id = obj.movieId;
        var ele = `<div id = ${obj.movieId} class="row" style="padding:20px;display:flex;justify-content:center;align-items:center;margin:10px;background-color:yellow">
            <div class="col-lg-3"><img  src="../${obj.cardImage}" style="width:5rem;height:5rem;border-radius:50%"></div>
            <div class="col-lg-3" style="font-size:18px;font-weight:500" >${obj.name}</div>
            <div class="col-lg-3"><a style="padding:8px 20px;color:black;background-color:blue;border-radius:10px;"  href="reviews.html#${obj.movieId}"+>Reviews</a></div>
            <div class="col-lg-3"<div style="padding:6px 10px;color:remove;background-color:red;border-radius:10px;width:9%;cursor:pointer;text-align:center" onclick="deletemovie('${obj.movieId}')">Remove</div></div>
        </div>`
        $("#allMoviesData").append(ele);
    }

    // for (x in obj) {
    //     $("#theatretablebody").append(
    //         `<div class="card row" style="display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;background-color: black;box-shadow: 1px 0px 3px 1px grey;padding: 10px;">
    //             <div  class="col-lg-2" style="text-align: center;"style="margin:0px;padding:0px;">${obj[x].theatreId}</div>
    //             <div class="col-lg-2" style="text-align: center;">${obj[x].ownerEmail}</div>
    //             <div class="col-lg-2" style="text-align: center;">${obj[x].theatreName}</div>
    //             <div class="col-lg-2" style="text-align: center;">${obj[x].location}</div>
    //             <div class="col-lg-2" style="text-align: center;">${obj[x].category}</div>
    //             <div class="btn col-lg-2" style="background-color:red;border-radius:10px;" onclick="removetheatrefromtheatresadmin('${obj[x].ownerEmail}')">Remove</div>
    //       </div>`
    //     )
    // }
}


function deletemovie(movieId) {
    $.post("http://localhost:3333/movies/removemovie", { movieId: movieId }, (hr, status, data) => {
        alert(responseText.responseText);
    })
}

function addAcceptedTheatrestoAdmin(obj) {
    for (x in obj) {
        $("#theatretablebody").append(
            `<div class="card row" style="display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;background-color: black;box-shadow: 1px 0px 3px 1px grey;padding: 10px;">
                <div  class="col-lg-2" style="text-align: center;"style="margin:0px;padding:0px;">${obj[x].theatreId}</div>
                <div class="col-lg-2" style="text-align: center;">${obj[x].ownerEmail}</div>
                <div class="col-lg-2" style="text-align: center;">${obj[x].theatreName}</div>
                <div class="col-lg-2" style="text-align: center;">${obj[x].location}</div>
                <div class="col-lg-2" style="text-align: center;">${obj[x].category}</div>
                <div class="btn col-lg-2" style="background-color:red;border-radius:10px;" onclick="removetheatrefromtheatresadmin('${obj[x].ownerEmail}')">Remove</div>
          </div>`
        )
    }

}

function removetheatrefromtheatresadmin(ownerEmail) {
    $.post("http://localhost:3333/theatres/removetheatre", { ownerEmail: ownerEmail }, (xhr, status, responseText) => {
        alert(responseText.responseText)
    })
}


function addUsersToAdminPage(obj) {
    var x = 1;
    for (key in obj) {
        var ele = document.createElement('tr');
        ele.innerHTML = `<td>${x}</td><td>${obj[key].name}</td><td>${obj[key].mobile}</td><td>${obj[key].email}</td>`;
        x++;
        $("#userdata").append(ele);
    }
    $(document).ready(function () {
        $("#userdata").dataTable({
            // data:obj,
            // columns:[
            //     {"mDate":null},
            //     {"mData":"name"},
            //     {"mData":"mobile"},
            //     {"mData":"email"}
            // ]
        })

    })
}
// }


function addQueriesToAdmin(obj) {
    for (k in obj) {
        var ele = document.createElement('tr');
        ele.innerHTML = `<td>${obj[k].name}</td><td>${obj[k].email}</td><td>${obj[k].subject}</td><td>${obj[k].message}</td>`;
        $("#enq").append(ele);
    }
    $("#enq").dataTable();
    // $(document).ready(()=>{
    //     $("#enquiries").dataTable({
    //         data:obj,
    //         columns:[
    //             {"mData":"name"},
    //             {"mData":"email"},
    //             {"mData":"subject"},
    //             {"mData":"message"},
    //         ]
    //     })  
    // })

}

function displayUsers() {
    $("#usersData").css("display", "table")
    $("#addMoviesData").css("display", "none")
    $("#addTheatresData").css("display", "none")
    $("#enquiries").css("display", "none")
}


function displayMovies() {
    $("#usersData").css("display", "none")
    $("#addMoviesData").css("display", "block")
    $("#addTheatresData").css("display", "none")
    $("#enquiries").css("display", "none")
}


function displayqueries() {
    $("#usersData").css("display", "none")
    $("#addMoviesData").css("display", "none")
    $("#addTheatresData").css("display", "none")
    $("#enquiries").css("display", "table")
}




function accepttheatre(ownerEmail) {
    if (localStorage.getItem("theatreemails") == null) {
        localStorage.setItem(ownerEmail, "1")
    }
    $.post("http://localhost:3333/theatres/accepttheatre", { ownerEmail: ownerEmail }, (xhr, status, responseText) => {
        alert(responseText.responseText);
    })

}


function rejecttheatre(ownerEmail) {
    $.post("http://localhost:3333/theatres/rejecttheatre", { ownerEmail: ownerEmail }, (xhr, status, responseText) => {
        alert(responseText.responseText);
    })
}



var theatreArr = []
var movieArr = []

$(document).ready(() => {
    $("#theatreSaveAndAddBtn").click(() => {
        var obj = {
            theatre: $("#addTheatreSelect").val(),
            price: $("#theatrePrice").val(),
            startDate: $("#theatreStartDate").val(),
            endDate: $("#theatreEndDate").val()
        }
        theatreArr.push(obj);
        $("#addTheatreSelect").val("null1"),
            $("#theatrePrice").val(null),
            $("#theatreStartDate").val(null),
            $("#theatreEndDate").val(null)
    })
    $("#addMovieBtn").click(() => {
        var theatreObjects = []
        for (i in theatreArr) {
            theatreObjects.push(theatreArr[i]);
        }
        var obj = {
            movieId: $("#addMovieId").val(),
            name: $("#addMovieName").val(),
            cardImage: $("#addMovieImUrl").val(),
            coverImage: $("#addMovieCoverImUrl").val(),
            description: $("#addMovieDescription").val(),
            category: $("#addMovieCategory").val(),
            format: $("#addMovieFormat").val(),
            duration: $("#addMovieDuration").val(),
            language: $("#addMovieLang").val(),
            bookings: 0,
            theatreObjects: theatreObjects
        }
        $.post("http://localhost:3333/movies/addmovie", obj, (xhr, status, responseText) => {
            alert(responseText.responseText);
            window.location.href = "admin.html";
        })
    })





})

function displayTheatres() {
    $("#usersData").css("display", "none")
    $("#addMoviesData").css("display", "none")
    $("#addTheatresData").css("display", "block")
    $("#enquiries").css("display", "none")
}


$(document).ready(() => {
    $("#MovieSaveAndAddBtn").click(() => {
        var obj = {
            movie: $("#addMovieSelect").val(),
            price: $("#moviePrice").val(),
            startDate: $("#movieStartDate").val(),
            endDate: $("#movieEndDate").val()
        }
        movieArr.push(obj);
        $("#addMovieSelect").val("null")
        $("#moviePrice").val("null");
        $("#movieStartDate").val("null");
        $("#movieEndDate").val("null")
    })
    $("#addTheatreBtn").click(() => {
        var movieObjects = []
        for (x in movieArr) {
            movieObjects.push(movieArr[x])
        }
        var obj = {
            theatreId: $("#addTheatreId").val(),
            name: $("#addTheatreName").val(),
            theatreImage: $("#addTheatreImUrl").val(),
            location: $("#addTheatreLocation").val(),
            bookings: 0,
            movieObjects: movieObjects,
        }
        $.post("http://localhost:3333/theatres/addtheatre", obj, (xhr, status, responseText) => {
            alert(responseText.responseText);
            window.location.href = "admin.html";
        })
    })

    $("#theatres-background").click(function () {
        $("#theatres-background").css({ backgroundColor: "#404e67" })
        $("#users-background").css({ backgroundColor: "white" })
        $("#enquiries-background").css({ backgroundColor: "white" })
        $(".theatres-text").css({ color: "white" })
        $(".users-text").css({ color: "#012970" })
        $(".enquiries-text").css({ color: "#012970" })

    })
    $("#users-background").click(function () {
        $("#theatres-background").css({ backgroundColor: "white" })
        $("#users-background").css({ backgroundColor: "#404e67" })
        $("#enquiries-background").css({ backgroundColor: "white" })
        $(".theatres-text").css({ color: "#012970" })
        $(".users-text").css({ color: "white" })
        $(".enquiries-text").css({ color: "#012970" })
    })
    $("#enquiries-background").click(function () {
        $("#theatres-background").css({ backgroundColor: "white" })
        $("#users-background").css({ backgroundColor: "white" })
        $("#enquiries-background").css({ backgroundColor: "#404e67" })
        $(".theatres-text").css({ color: "#012970" })
        $(".users-text").css({ color: "#012970" })
        $(".enquiries-text").css({ color: "white" })
    })



})



$(document).ready(() => {
    $("#submitMovie").click(() => {
        if (localStorage.getItem("movieId") == null) {
            localStorage.setItem("movieId", 1);
        }
        var name = $("#movie_name").val()
        var category = $("#category").val()
        var duration = $("#duration").val()
        var description = $("#description").val()
        var startDate = $("#startDate").val()
        var format = $("#format").val()
        var languages = $("#language").val()
        var cardImage = document.getElementById("movie_image").files[0];
        var coverImage = document.getElementById("cover_image").files[0];
        console.log(cardImage)

        var movieDetails = new FormData();
        movieDetails.append("movieId", localStorage.getItem("movieId")),
        movieDetails.append("name", name),
        movieDetails.append("cardImage", cardImage),
        movieDetails.append("coverImage", coverImage),
        movieDetails.append("category", category),
        movieDetails.append("duration", duration),
        movieDetails.append("languages", languages),
        movieDetails.append("format", format),
        movieDetails.append("description", description),
        movieDetails.append("startDate", startDate),
        movieDetails.append("bookings", "0"),
        movieDetails.append("access", "true")

        // $.post("http://localhost:3333/movies/addmovie", obj, (xhr, status, responseText) => {
        //     alert(responseText.responseText);
        // })
        $.ajax({
            method:'POST',
            processData:false,
            url:'http://localhost:3333/movies/addmovie',
            contentType:false,
            data:movieDetails,
            success:function(data)
            {
                alert(data)
            }
        })

        localStorage.setItem("movieId", parseInt(localStorage.getItem("movieId")) + 1);
    })
})