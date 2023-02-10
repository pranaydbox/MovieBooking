window.onload=function(){
    // alert(localStorage.getItem("theatreId"))
    if(localStorage.getItem("theatreId")==null)
    {
    
        window.localStorage.setItem("theatreId",1);
        // alert(localStorage.getItem("theatreId"))
    }
    else
    {
        
        // alert(localStorage.getItem("theatreId"))
    }
}
$(document).ready(()=>{
    $("#sendQueryButton").click(()=>{
        name1=$("#queryName").val();
        email=$("#queryEmail").val();
        subject=$("#querySubject").val();
        message=$("#queryMessage").val();
        var obj={
            name:name1,
            email:email,
            subject:subject,
            message:message
        }
        sendToAdmin(obj);
    })
})

function sendToAdmin(obj){
    $.post("http://localhost:3333/queries/addqueries",obj,(xhr,status,responseText)=>{
        alert(responseText.responseText);
        window.location.href="contact.html"
    })
}
$("#submitTheatre").click(function()
{
    
    theatrename=$("#theatre_name").val();
    theatreurl=$("#theatre_url").val();
    theatrelocation=$("#theatre_location").val();
    theatrecategory=$("#category1").val();
    var theatreDetails={
        theatreId:localStorage.getItem("theatreId"),
        theatreName:theatrename,
        ownerEmail:localStorage.getItem("currentLoginUser"),
        category:theatrecategory,
        theatreImage:theatreurl,
        location:theatrelocation,
        bookings:0,
        access:"pending",
        movieObjects:[],
        beverageObjects:[]
    }

    
window.localStorage.setItem("theatreId",parseInt(window.localStorage.getItem("theatreId"))+1);

    $.post("http://localhost:3333/theatres/addtheatre",theatreDetails,(xhr,status,responseText)=>{
        alert(responseText.responseText);
        window.location.href="contact.html";
    })
})