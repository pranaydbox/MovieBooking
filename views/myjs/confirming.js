window.onload=function()
{
    var arr=window.location.hash.substring(1).split(":");
    // alert(arr)
    $.get("http://localhost:3333/movies/getmovie/"+arr[0],(moviedata,status)=>{
        // alert(moviedata)
        
        $.get("http://localhost:3333/theatres/getsingletheatre/"+arr[1],(theatredata,status)=>{
            getmovietheatredata(moviedata,theatredata)
        })
    })
    $("#confirmseats").attr("href","confirmed.html#"+window.location.hash.substring(1))
}
function getmovietheatredata(moviedata,theatredata)
{
    var arr=window.location.hash.substring(1).split(":");
    // var seat=localStorage.getItem("seatsarr").split(":")
    $("#tablebody").append(
        `<tr><td>Movie Name</td><td>:</td><td>${moviedata.name}</td></tr>
        <tr><td>Duration</td><td>:</td><td>${moviedata.duration}</td></tr>
        <tr><td>Category</td><td>:</td><td>${moviedata.category}</td></tr>
        <tr><td>Theatre Name</td><td>:</td><td>${theatredata.theatreName}</td></tr>
        <tr><td>Location</td><td>:</td><td>${theatredata.location}</td></tr>
        <tr><td>No of Seats</td><td>:</td><td>${parseInt(arr[3])}</td></tr>
        <tr><td>Ticket Price</td><td>:</td><td>${parseInt(arr[2])}</td></tr>
        <tr><td>Seats No</td><td>:</td><td>${localStorage.getItem("seatsarr")}</td></tr>
        <tr><td>Total Price</td><td>:</td><td>${parseInt(arr[3])}*${parseInt(arr[2])} = ${parseInt(arr[4])}</td></tr>`
    )
    
}