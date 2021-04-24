var currentIndex = localStorage.getItem("cricketIndex");
var selectedPlayers =[] ;
var matchWithSelPlayer ={
    wckeeper: [],
    batsman: [],
    allRounder: [],
    bowler:[]
    };
var cteam = matchList[currentIndex];
$(() => {

    
    $("#matchbwn").html(cteam.team1Name +' vs '+cteam.team2Name);

    loadPlayer(cteam);
});

function loadPlayer(match) {
    match.wckeeper.forEach(p =>{
        $("#wktbody").append(`
        <tr id="p`+p.id+`" onclick="selectPlayer('wckeeper','`+p.id+`')">
        <td><div class="player">
            <img src="../img/wk.svg" width="20"/> <span>`+p.playerName+`</span>
        </div></td>
        <td>`+p.credit+`</td>
        <td>`+p.pt+`</td>
        </tr>`); 
         
    });
    match.batsman.forEach(p =>{
        $("#battbody").append(`
        <tr id="p`+p.id+`" onclick="selectPlayer('batsman','`+p.id+`')">
        <td><div class="player">
            <img src="../img/wk.svg" width="20"/> <span>`+p.playerName+`</span>
        </div></td>
        <td>`+p.credit+`</td>
        <td>`+p.pt+`</td>
        </tr>`);    
    });
    match.allRounder.forEach(p =>{
        $("#alltbody").append(`
        <tr id="p`+p.id+`" onclick="selectPlayer('allRounder','`+p.id+`')">
        <td><div class="player">
            <img src="../img/wk.svg" width="20"/> <span>`+p.playerName+`</span>
        </div></td>
        <td>`+p.credit+`</td>
        <td>`+p.pt+`</td>
        </tr>`);     
    });
    match.bowler.forEach(p =>{
        $("#bwltbody").append(`
        <tr id="p`+p.id+`" onclick="selectPlayer('bowler','`+p.id+`')">
        <td><div class="player">
            <img src="../img/wk.svg" width="20"/> <span>`+p.playerName+`</span>
        </div></td>
        <td>`+p.credit+`</td>
        <td>`+p.pt+`</td>
        </tr>`);   
    })
    

    

}

function selectPlayer(role, pid){
    console.log(role, pid)
    const b  = matchList[currentIndex][role].findIndex(x =>x.id== pid);
    if(b !== -1){
        player  = matchList[currentIndex][role][b]
    }
    console.log(player)
  if(player && player.isActive){
      player['isActive'] = false;
      $('#p'+pid).removeClass("table-primary");
    const six = selectedPlayers.findIndex(x=> x.id == pid);
    if(six !== -1){
        selectedPlayers.splice(six, 1);
        
    }else{
        selectedPlayers.push(player)
    }
  }else{
    player['isActive'] = true;
    $('#p'+pid).addClass("table-primary");
    const six = selectedPlayers.findIndex(x=> x.id == pid);
    if(six !== -1){
        selectedPlayers.splice(six, 1);
    }else{
        selectedPlayers.push(player)
    }
  }

  setTimeout(()=>{
    $("#swk").html('');
    $("#sbat").html('');
    $("#sall").html('');
    $("#sbwl").html('');
    matchWithSelPlayer.wckeeper= [];
    matchWithSelPlayer.batsman =[];
    matchWithSelPlayer.allRounder = [];
    matchWithSelPlayer.bowler =[];
      selectedPlayers.forEach(pl =>{
            let player = `
                <div class="card px-2 py-1 mr-1 bg-info text-white" style="min-width:100px;max-width:300px;">
                    `+pl.playerName+`
                  </div>
                 `;
                 if(pl.team.includes('-WK') ){
                    matchWithSelPlayer.wckeeper.push(pl)
                    $("#swk").append(player);
                }else if(pl.team.includes('-BAT')){
                    matchWithSelPlayer.batsman.push(pl)
                    $("#sbat").append(player);
                }else if(pl.team.includes('-ALL')){
                    matchWithSelPlayer.allRounder.push(pl)
                    $("#sall").append(player);
                }else if(pl.team.includes('-BOWL')){
                    matchWithSelPlayer.bowler.push(pl)
                    $("#sbwl").append(player);
                }
      });
  })
  console.log(selectedPlayers)
  $("#slen").html(selectedPlayers.length)
}

function gotoTeamGenerator(){
    
   
      if(matchWithSelPlayer.wckeeper.length < 1){
    return  alert('Please select atleast 1 to 3 wicket keeper');
   
   }
   if(matchWithSelPlayer.batsman.length < 3){
    return alert('Please select atleast 3 to 6 batsman');
    
}
if(matchWithSelPlayer.allRounder.length < 1){
    return alert('Please select atleast 1 to 3 all rounder');
    
}
if(matchWithSelPlayer.bowler.length < 3){
    return alert('Please select atleast 3 to 6 bowler');
    
}


    if((matchWithSelPlayer.allRounder.length +
        matchWithSelPlayer.batsman.length +
        matchWithSelPlayer.bowler.length +
        matchWithSelPlayer.wckeeper.length) <= 11){
        alert("Please add atleast 12 or more players to Continue.")
    }else{
        cteam['matchSelPlayers'] = matchWithSelPlayer;
        localStorage.setItem('selectedPlayers', JSON.stringify(cteam));
        console.log("team", cteam);
       setTimeout(()=>{
        window.location.href="../cricket-team-generator/prediction.html"
    
       },100)
    }
   
   
}
