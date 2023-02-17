window.onload=function()
{
    var arr=window.location.hash.substring(1).split(":");
    // alert("after splilt")
    // alert(arr)
    $.get("http://localhost:3333/movies/getmovie/"+arr[0],(moviedata,status)=>{
        // alert("100")
        $.get("http://localhost:3333/theatres/getsingletheatre/"+arr[1],(theatredata,status)=>{
            
            $.post("http://localhost:3333/users/getprofile",{curremail:localStorage.getItem("currentLoginUser")},(xhr,status,responseText)=>{
                var userdata=JSON.parse(responseText.responseText);
                // alert(userdata)
                getmovietheatredata(moviedata,theatredata,userdata)
            })
            
        })
    })
}
function getmovietheatredata(moviedata,theatredata,userdata)
{
    var price = { "category D": 120, "category C": 150, "category B": 180, "category A": 200 }
    var arr=window.location.hash.substring(1).split(":");
    // var seat=localStorage.getItem("seatsarr").split(":")
    $("#ticket").append(
        `<div style="background-color: rgb(2, 2, 2);">
        <h2 style="text-align: center;margin: 0px;font-weight: bold;font-size: 30px;padding: 15px;">Movie Ticket</h2>
    </div>
    <div style="margin: auto; width: 80%;">
        <div style="border-bottom: 2px solid black;" id="hello">
            <h4 style="color:black;font-weight: bold;">Theatre Details</h4>
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <div>
                    <p>${theatredata.theatreName}</p>
                    <p>${theatredata.location}</p>
                </div>
                <div>
                    <img src="../${moviedata.cardImage}" width="150" height="150">
                </div>
            </div>
        </div>
       

        <div style="border-bottom: 2px solid black;">
            <h4 style="color:black;font-weight: bold;">Movie Details</h4>
            <div style="display: flex; justify-content: space-between;align-items: center;flex-direction: row;">
                <div>
                    <table>
                        <tr><td>Name : </td><td>${moviedata.name}</td></tr>
                        <tr><td>category : </td><td>${moviedata.category}</td></tr>
                        <tr><td>Ticket price: </td><td>${price[theatredata.category]}</td></tr>
                        <tr><td>Language : </td><td>${moviedata.languages[0]}</td></tr>
                    </table>
                </div>
                <div>
                    <table>
                        <tr><td>Format : </td><td>${moviedata.format}</td></tr>
                        <tr><td>No of seats : </td><td>${localStorage.getItem("seatsarr").split(",").length}</td></tr>
                        <tr><td>Seats Booked : </td><td>${localStorage.getItem("seatsarr")}</td></tr>
                        <tr><td>Price : </td><td>${price[theatredata.category]*localStorage.getItem("seatsarr").split(",").length}</td></tr>
                    </table>
                </div>
            </div>
        </div>
        <div>
            <h4 style="color:black;font-weight: bold;">Your Details</h4>
            <div style="display: flex; justify-content: space-between;align-items: center;flex-direction: row;">
                <div>
                    <table>
                        <tr><td>Name : </td><td>${userdata.name}</td></tr>
                        <tr><td>Mobile : </td><td>${userdata.mobile}</td></tr>
                        <tr><td>Age : </td><td>22</td></tr>
                        <tr><td>Gender : </td><td>Female</td></tr>
                    </table>
                </div>
                <div>
                    <table>
                        <tr><td>Email : </td><td>${userdata.email}</td></tr>

                       
                    </table>
                </div>
            </div>
        </div>
    </div>`
    )
}