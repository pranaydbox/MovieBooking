window.onload = () => {
    $.post("http://localhost:3333/reviews/getreviews", { movieId: window.location.hash.substring(1) }, (xhr, status, responseText) => {
        var data = JSON.parse(responseText.responseText);

        for (x in data) {
            var before = new Date(data[x].date).toLocaleString();
            var today = new Date().toLocaleString();
            before = before.split(",")[0]
            today = today.split(",")[0]
            before=before.split("/")
            today=today.split("/")
            const date1 = new Date(before[1]+"/"+before[0]+"/"+before[2]);
            const date2 = new Date(today[1]+"/"+today[0]+"/"+today[2]);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            

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
            $("#reviewContainer").append(`<div class="card col-lg-12" style="color:white;border-radius:10px;box-shadow:2px 2px 10px 2px grey;background-color:black">
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

    })
}