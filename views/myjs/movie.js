window.onload = () => {
    var hash = window.location.hash.substring(1);
    $.post("http://localhost:3333/users/getprofile", { curremail: localStorage.getItem("currentLoginUser") }, (xhr, status, responseText) => {
        var userData = JSON.parse(responseText.responseText);
        $.get("http://localhost:3333/movies/getmovie/" + hash, (data, status) => {
            $("#movieCardImage").attr("src", "../" + data.cardImage);
            $("#movieCardName").html(data.name);
            $("#movieCardDescription").html(data.description);
            var url = "../" + data.coverImage;
            $('#popupimage').attr("src", "../" + data.cardImage)
            $("#rateNowButton").attr("onclick", `addreview({movieId:'${data.movieId}',name:'${userData.name}',email:'${localStorage.getItem("currentLoginUser")}',rating:'3',review:'${$("#reviewspace").val()}',userimage:'${userData.image}'})`)
            $("#MoviePageBody").css({ "background": "linear-gradient(to left, rgba(0,0,0, 0) 35%, rgb(12, 12, 12),rgba(0,0,0,1))," + "url(" + url + ")", "background-repeat": "no-repeat", "background-size": "100%", "z-index": "100", "height": "auto" })
            $("#moviecategory").html(data.category);
            $("#movieformat").html(data.format);
            $("#movieduration").html(Math.floor(data.duration / 60) + "h" + (data.duration % 60) + "m");
            $("#language").html(data.languages);
            $("#startDate").html(data.startDate.substring(0, 10));
            // $("#movierating").html(Math.round(data.ratingavg*2,2));
            $("#movierating").html("9")
            addtheatres(data.theatreObjects, "Hyderabad");
            addreviewstobottom(data.reviewObjects);
        })
    });
}


function addreview(obj) {

    obj.rating = localStorage.getItem("stars");
    var rev = $("#reviewspace").val();
    obj.review = rev;
    $.post("http://localhost:3333/reviews/addreview", obj, (xhr, status, responseText) => {
        alert(responseText.responseText);
        window.location.reload();
    })
}


function addtheatres(data, location) {
    var price = { "category D": 120, "category C": 150, "category B": 180, "category A": 200 }
    for (x in data) {
        obj = data[x];
        var ele = document.createElement("div");
        ele.innerHTML = "<div>" + obj.theatreName + "</div><div>" + obj.location + "</div><div>₹" + price[obj.category] + "</div> <div style='border-radius:10px;background-color: greenyellow;padding: 15px;cursor:pointer' onclick='bookmoviefrommovies(" + obj.theatreId + "," + window.location.hash.substring(1) + "," + price[obj.category] + ")'>Book Now!</div>"
        ele.className = "col-lg-10 card";
        ele.style = "display:flex;flex-direction: row;gap:22%;justify-content:center;align-items: center;background-color:black;border-radius:20px;padding:30px 5px;font-weight:900;font-size:15px;box-shadow:2px 2px 8px 2px grey";
        $("#theatreRow").append(ele);
    }
}

function addreviewstobottom(data) {
    $("#seeallbutton").attr("href", "reviews.html#" + window.location.hash.substring(1));

    for (let x = 0; x < 4; x++) {
        var temp = "";
        var y = 0;
        for (var i = 0; i < parseInt(data[x].rating); i++) {
            temp = temp + `<div class="fa fa-star checked" style="color:gold"></div>`;
            y++;

        }
        while (y < 5) {
            temp = temp + `<div class="fa fa-star" style="color:white"></div>`;
            y++;
        }
        var before = new Date(data[x].date).toLocaleString();
        var today = new Date().toLocaleString();
        before = before.split(",")[0]
        today = today.split(",")[0]
        before = before.split("/")
        today = today.split("/")
        const date1 = new Date(before[1] + "/" + before[0] + "/" + before[2]);
        const date2 = new Date(today[1] + "/" + today[0] + "/" + today[2]);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        $("#bottomreviewContainer").append(`<div class="card col-lg-5" style="color:white;border-radius:20px;background-color:black;box-shadow:2px 1px 8px 0px grey">
            <div class='card-body' style="display:flex;flex-direction:column;justify-content:center;gap:20px">
                <div style="display:flex;flex-direction:row;align-items:center;gap:25px;justify-content:flex-start">
                        <img style="width:4rem;height:4rem;border-radius:50%"src="../${data[x].userimage}">
                        <div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%">
                            <div>
                                <div style="font-weight:600">${data[x].name}</div>
                                ${temp}
                            </div>
                            <div style="font-weight:500">${diffDays} Days ago</div>
                        </div>
                    </div>
                <div class="card-text" style="text-align:left">${data[x].review}</div>
            </div>
        </div>`)
    }
}


function bookmoviefrommovies(theatreId, movieId, price) {
    window.location.href = "booking.html#" + movieId + ":" + theatreId;
}