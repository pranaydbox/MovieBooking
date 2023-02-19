var ar;
var theatredata;
var moviedata;
var price = { "category D": 120, "category C": 150, "category B": 180, "category A": 200 }
var cost;
window.onload = async function () {
    var resstr = window.location.hash.substring(1);
    $.post("http://localhost:3333/bookings/getseatstatus", { pattern: resstr }, (xhr, status, responseText) => {
        ar = JSON.parse(responseText.responseText).seatingStatus;

        makeseats(JSON.parse(responseText.responseText).seatingStatus);
    })
    var arr = window.location.hash.substring(1).split(":");
    moviedata=await $.get("http://localhost:3333/movies/getmovie/" + arr[0]);
    theatredata=await $.get("http://localhost:3333/theatres/getsingletheatre/" + arr[1]);


}

var count = 0;
var seatsarr = []

function getconfirmingdata(){
    getmovietheatredata(moviedata, theatredata);
}

function makeseats(arr) {
    // alert(ar)
    for (var i = 1; i <= 48; i++) {
        if (arr[i - 1] == '2') {
            document.getElementById(i + "").className = "seat occupied";
        }
        else {
            document.getElementById(i + "").className = "seat";
        }
    }
}

function getmovietheatredata(moviedata, theatredata) {
    var arr = window.location.hash.substring(1).split(":");
    total = price[theatredata.category] * count;
    cost=price[theatredata.category];
    var str = ""
    for (i in seatsarr) str = str + "," + seatsarr[i];
    localStorage.setItem("seatsarr", str.substring(1))
    // window.location.href = "./confirming.html" + window.location.hash + ":" + count + ":" + total;

    var seat = localStorage.getItem("seatsarr").split(":")
    $("#confirmingdata").html("")
    $("#confirmingdata").append(
        `<table style="margin: auto;">
        <tr><td>Movie Name</td><td>:</td><td>${moviedata.name}</td></tr>
        <tr><td>Duration</td><td>:</td><td>${moviedata.duration}</td></tr>
        <tr><td>Category</td><td>:</td><td>${moviedata.category}</td></tr>
        <tr><td>Theatre Name</td><td>:</td><td>${theatredata.theatreName}</td></tr>
        <tr><td>Location</td><td>:</td><td>${theatredata.location}</td></tr>
        <tr><td>No of Seats</td><td>:</td><td>${count}</td></tr>
        <tr><td>Ticket Price</td><td>:</td><td>${price[theatredata.category]}</td></tr>
        <tr><td>Seats No</td><td>:</td><td>${localStorage.getItem("seatsarr")}</td></tr>
        <tr><td>Total Price</td><td>:</td><td>${count}*${price[theatredata.category]} = ${price[theatredata.category] * count}</td></tr>
        </table>`
    )

}


function colorchange(id) {
    var arr = window.location.hash.substring(1).split(":");
    var x = document.getElementById(id + "").className;
    if (x == "seat occupied") {
        ;
    }
    else if (x == "seat selected") {
        document.getElementById(id + "").className = "seat";
        ar[id - 1] = "0";
        count--;
        seatsarr = seatsarr.filter(item => item != id)
    }
    else {
        document.getElementById(id + "").className = "seat selected";
        ar[id - 1] = "1";
        seatsarr.push(id);
        count++;
    }

    document.getElementById("counter").innerHTML = count;
    document.getElementById("total").innerHTML = price[theatredata.category] * count;
}


function confirmbooking() {
    for (let i = 0; i < ar.length; i++) {
        if (ar[i] == "1") {
            ar[i] = "2";
            document.getElementById((i + 1) + "").className = "seat occupied";
        }
    }
    var arr = window.location.hash.substring(1).split(":");
    $.post("http://localhost:3333/bookings/booknow", {price:cost,movieId: arr[0], theatreId: arr[1], bookings: count, curremail: localStorage.getItem("currentLoginUser"), changedseats: ar, pattern: window.location.hash.substring(1) }, (xhr, status, responseText) => {
        alert(responseText.responseText);
        window.location.href = "confirmed.html#" + window.location.hash.substring(1);
    })

}

