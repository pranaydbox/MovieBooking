var ar;
window.onload=function(){
    var resstr=window.location.hash.substring(1);
    $.post("http://localhost:3333/bookings/getseatstatus",{pattern:resstr},(xhr,status,responseText)=>{
        ar=JSON.parse(responseText.responseText).seatingStatus;
        
        makeseats(JSON.parse(responseText.responseText).seatingStatus);
    })

}


function makeseats(arr){
    // alert(ar)
    for(var i=1;i<=48;i++){
        if(arr[i-1]=='2'){
            document.getElementById(i+"").className="seat occupied";
        }
        else{
            document.getElementById(i+"").className="seat";
        }
    }
}

var count =0;
price=0
var seatsarr=[]
function colorchange(id){
    var arr=window.location.hash.substring(1).split(":");
    price=parseInt(arr[2])
    var x=document.getElementById(id+"").className;
    if(x=="seat occupied")
    {
        ;
    }
    else if(x=="seat selected"){
        document.getElementById(id+"").className="seat";
        ar[id-1]="0";
        count--;
        seatsarr=seatsarr.filter(item=>item!=id)
    }
    else{
        document.getElementById(id+"").className="seat selected";
        ar[id-1]="1";
        seatsarr.push(id);
        count++;
    }

    document.getElementById("counter").innerHTML=count;
    document.getElementById("total").innerHTML=price*count;
}


function confirmbooking(){
    alert(ar)
    for(let i=0;i<ar.length;i++)
    {
        if(ar[i]=="1")
        {
            ar[i]="2";
            document.getElementById((i+1)+"").className="seat occupied";
        }
    }
    var arr=window.location.hash.substring(1).split(":");
    $.post("http://localhost:3333/bookings/booknow",{movieId:arr[0],theatreId:arr[1],bookings:count,curremail:localStorage.getItem("currentLoginUser"),changedseats:ar,pattern:window.location.hash.substring(1)},(xhr,status,responseText)=>{
        alert(responseText.responseText);
        total=price*count;

        var str=""
        for(i in seatsarr) str=str+","+seatsarr[i];
        localStorage.setItem("seatsarr",str.substring(1))
        alert(localStorage.getItem("seatsarr"))
        window.location.href="./confirming.html"+window.location.hash+":"+count+":"+total;
    })
}

