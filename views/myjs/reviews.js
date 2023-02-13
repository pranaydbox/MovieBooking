window.onload=()=>{
    $.post("http://localhost:3333/reviews/getreviews",{movieId:window.location.hash.substring(1)},(xhr,status,responseText)=>{
        var data=JSON.parse(responseText.responseText);
        
        for(x in data){
            // $("#reviewContainer").append(
            //     ` <div style="display: flex;flex-direction: row;background-color:black;justify-content: space-evenly;align-items: center;">
            //             <div>${obj[x].name}</div>
            //             <div>${obj[x].email}</div>
            //             <div>${obj[x].rating}</div>
            //             <div>${obj[x].review}</div>
            //         </div>`
            // )
            var temp="";
            var y=0;
            for(var i=0;i<parseInt(data[x].rating);i++){
                temp=temp+`<div class="fa fa-star checked" style="color:red"></div>`;
                y++;
                
            }
            while(y<5){
                temp=temp+`<div class="fa fa-star" style="color:black"></div>`;
                y++;
            }
            $("#reviewContainer").append(`<div class="card col-lg-12" style="color:black;border-radius:10px;">
                <div class='card-body' style="display:flex;flex-direction:column;justify-content:center;gap:20px">
                    <div style="display:flex;flex-direction:row;align-items:center;gap:25px;justify-content:flex-start">
                        <div class='fa fa-user-circle' style="z-index:100;font-size:50px"></div>
                        <div>
                            <div style="font-weight:600">${data[x].name}</div>
                            ${temp}
                        </div>
                    </div>
                    <div class="card-text" style="text-align:left">${data[x].review}</div>
                </div>
            </div>`)
        }

    })
}