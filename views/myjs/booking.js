var ar;
window.onload=function(){
    var resstr=window.location.hash.substring(1);
    $.post("http://localhost:3333/bookings/getseatstatus",{pattern:resstr},(xhr,status,responseText)=>{
        ar=JSON.parse(responseText.responseText).seatingStatus;
        
        makeseats(JSON.parse(responseText.responseText).seatingStatus);
    })

}


function makeseats(arr){
    for(var i=1;i<=48;i++){
        if(arr[i-1]=='1'){
            document.getElementById(i+"").className="seat occupied";
        }
        else{
            document.getElementById(i+"").className="seat";
        }
    }
}

var count =0;


function colorchange(id){
    var x=document.getElementById(id+"").className;
    if(x=="seat selected"){
        document.getElementById(id+"").className="seat";
        ar[id-1]="0";
        count--;
    }
    else{
        document.getElementById(id+"").className="seat selected";
        ar[id-1]="1";
        count++;
    }
    document.getElementById("counter").innerHTML=count;
    document.getElementById("total").innerHTML=200*count;
}


function confirmbooking(){
    var arr=window.location.hash.substring(1).split(":");
    $.post("http://localhost:3333/bookings/booknow",{movieId:arr[0],theatreId:arr[1],bookings:count,curremail:localStorage.getItem("currentLoginUser"),changedseats:ar,pattern:window.location.hash.substring(1)},(xhr,status,responseText)=>{
        alert(responseText.responseText);
        window.location.href="movies.html";
    })
}

