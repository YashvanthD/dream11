

$(()=>{
    


matchList.forEach((el,i)=>{
    $("#nav-cricket").append(`<div class="card mb-1" onclick="gotToPlayers(`+i+`)">
    <div class="text-dark pl-3 gtype">`+el.matchtype+` <span class="badge badge-danger p-1 float-right m-1">`+el.date+`</span></div>
    <div class="card-body">
       
        <div class="container-fluid">
            <div class="row">
                <div class="col-5 font-weight-bold">`+el.team1Name+`</div>
                <div class="col-2 text-center">VS</div>
                <div class="col-5 font-weight-bold text-right">`+el.team2Name+`</div>
            </div>
        </div>
      
    </div>
    <div class="container-fluid pb-2">
    <div class="row"> <div class="col-12 text-center"><a class=" p-1 px-2 bg-dark text-white rounded gteamLink" href="javascript:void(0)">choose Players ></a></div></div>
    </div>
    </div>`);
})

});


function gotToPlayers(i){
    console.log(i);
    localStorage.setItem('cricketIndex', i);
    setTimeout(()=>{
        window.location.href="select-player/dream11-cricket-team-generator.html"
    })
}