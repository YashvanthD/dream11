var currentIndex = localStorage.getItem("cricketIndex");
var cteam = matchList[currentIndex];
$("#matchbwn").html(cteam.team1Name + ' vs ' + cteam.team2Name);








var teamer = [JSON.parse(localStorage.getItem("selectedPlayers"))];

var generatedTeam = [];
var fulldata = [];
var creditOfHundredPlayerList = [];

teamer[0].team1wk = []
teamer[0].team2wk = []
teamer[0].matchSelPlayers.wckeeper.forEach(elm => {
   let  player = `
   <div class="card px-2 py-1 mr-1 bg-info text-white" style="min-width:100px;max-width:300px;">
       `+elm.playerName+`
     </div>`;
     $("#swk").append(player);
   elm.team.includes(teamer[0].team1Name) ? teamer[0].team1wk.push(elm) : teamer[0].team2wk.push(elm)
});
teamer[0].team1bat = []
teamer[0].team2bat = []
teamer[0].matchSelPlayers.batsman.forEach(elm => {
   let  player = `
   <div class="card px-2 py-1 mr-1 bg-info text-white" style="min-width:100px;max-width:300px;">
       `+elm.playerName+`
     </div>`;
     $("#sbat").append(player);
   elm.team.includes(teamer[0].team1Name) ? teamer[0].team1bat.push(elm) : teamer[0].team2bat.push(elm)

})
teamer[0].team1all = []
teamer[0].team2all = []
teamer[0].matchSelPlayers.allRounder.forEach(elm => {
   let  player = `
   <div class="card px-2 py-1 mr-1 bg-info text-white" style="min-width:100px;max-width:300px;">
       `+elm.playerName+`
     </div>`;
     $("#sall").append(player);
   elm.team.includes(teamer[0].team1Name) ? teamer[0].team1all.push(elm) : teamer[0].team2all.push(elm)

})
teamer[0].team1bwl = []
teamer[0].team2bwl = []
teamer[0].matchSelPlayers.bowler.forEach(elm => {
   let  player = `
   <div class="card px-2 py-1 mr-1 bg-info text-white" style="min-width:100px;max-width:300px;">
       `+elm.playerName+`
     </div>`;
     $("#sbwl").append(player);
   elm.team.includes(teamer[0].team1Name) ? teamer[0].team1bwl.push(elm) : teamer[0].team2bwl.push(elm)

})
var totplayer =teamer[0].matchSelPlayers.wckeeper.length + teamer[0].matchSelPlayers.batsman.length +teamer[0].matchSelPlayers.allRounder.length + teamer[0].matchSelPlayers.bowler.length;
$('#slen').html(totplayer)
teamer[0].team1srtwk = _.sortBy(teamer[0].team1wk, 'pt').reverse()
teamer[0].team1srtbat = _.sortBy(teamer[0].team1bat, 'pt').reverse()
teamer[0].team1srtall = _.sortBy(teamer[0].team1all, 'pt').reverse()
teamer[0].team1srtbwl = _.sortBy(teamer[0].team1bwl, 'pt').reverse()

teamer[0].team2srtwk = _.sortBy(teamer[0].team2wk, 'pt').reverse()
teamer[0].team2srtbat = _.sortBy(teamer[0].team2bat, 'pt').reverse()
teamer[0].team2srtall = _.sortBy(teamer[0].team2all, 'pt').reverse()
teamer[0].team2srtbwl = _.sortBy(teamer[0].team2bwl, 'pt').reverse()


//   limitation
limitation = { wklimit: { min: 1, max: 4 }, batlimit: { min: 3, max: 6 }, alllimit: { min: 1, max: 4 }, bwllimit: { min: 3, max: 6 } };

// findedCombo[16]

wklimit = limitation.wklimit;
batlimit = limitation.batlimit;
alllimit = limitation.alllimit;
bwllimit = limitation.bwllimit;

var findedCombo = [];

function findcombo(input) {
   for (i = 0; i < input; i++) {
      for (j = 0; j < input; j++) {
         for (k = 0; k < input; k++) {
            for (l = 0; l < input; l++) {
               (i + j + k + l == input) ? findedCombo.push({ i: i, j: j, k: k, l: l }) : null
            }
         }
      }
   }
}

findcombo(11);




var comboOfEleven = [];
function pushcomboofeleven(obj, ix) {
   comboOfEleven.push(obj);
   $("#selCombo").append(`<option value="` + ix + `" onclick="selIndex(` + ix + `)">wk(` + obj.i + `) | bat(` + obj.j + `) | all(` + obj.k + `) | bwl(` + obj.l + `)</option>`)
}
var ix = -1;
findedCombo.forEach(c => {
   if (

      (wklimit.min <= c.i && wklimit.max >= c.i) &&
      (batlimit.min <= c.j && batlimit.max >= c.j) &&
      (alllimit.min <= c.k && alllimit.max >= c.k) &&
      (bwllimit.min <= c.l && bwllimit.max >= c.l)

   ) {

      if (c.i + c.j + c.k + c.l == 11) {
         ix = ix + 1;
         pushcomboofeleven({ i: c.i, j: c.j, k: c.k, l: c.l }, ix)
      } else {

      }
   }
})




wkcombo = [];
batcombo = [];
allcombo = [];
bwlcombo = [];

function combofromtwoTeam(input, array) {
   for (k = 0; k <= input; k++) {
      for (l = 0; l <= input; l++) {

         (k + l == input) ? array.push({ k: k, l: l }) : null
      }
   }

}





function GenerateTeamwithcvc() {
   $("#generatedTeam").html('');
   $("#totalGenCount").html('0 Team generated.');
   currentIndex = $("#selCombo").val();
   console.log(currentIndex);
   var c = comboOfEleven[currentIndex];
   console.log(c);
   GenerateTeam(c.i, c.j, c.k, c.l);

}


function findteam(arr, role) {
   return arr['Team1'].slice(0, 1).concat(arr['Team2'].slice(0, 2));

}
function player(pl) {
   let c = 0;
   var a = ''
   pl.forEach(p => {

      c = c + parseFloat(p.credit);
   })


   setTimeout(() => {
      if (c <= 100) {

         creditOfHundredPlayerList.push({ credit: c, players: pl })
      }
   })




}


function GenerateTeam(i, j, k, l) {
   // gener
   fulldata = [];
   combofromtwoTeam(i, wkcombo = []);
   combofromtwoTeam(j, batcombo = []);
   combofromtwoTeam(k, allcombo = []);
   combofromtwoTeam(l, bwlcombo = []);






   wkcombo.forEach(wk => {
      batcombo.forEach(bt => {
         allcombo.forEach(all => {
            bwlcombo.forEach(bwl => {
               teamer[0].team1srtwk

               var wck = teamer[0].team1srtwk.slice(0, wk.k).concat(teamer[0].team2srtwk.slice(0, wk.l));
               var bat = teamer[0].team1srtbat.slice(0, bt.k).concat(teamer[0].team2srtbat.slice(0, bt.l));
               var allR = teamer[0].team1srtall.slice(0, all.k).concat(teamer[0].team2srtall.slice(0, all.l));
               var bowl = teamer[0].team1srtbwl.slice(0, bwl.k).concat(teamer[0].team2srtbwl.slice(0, bwl.l));

               let teams = [...wck, ...bat, ...allR, ...bowl];
               (teams.length == 11) ? fulldata.push({ team: teams }) : null;



            })
         })
      })
   })


   setTimeout(() => {
      generateTeamWithCapVC = [];
      creditOfHundredPlayerList = [];
      if(fulldata.length == 0){
         if(teamer[0].matchSelPlayers.wckeeper.length <  i ){
          return  alert(`Please select more wicket keeper to generate this combination. wk(` + i + `) | bat(` + j + `) | all(` + k + `) | bwl(` + l + `)`);
         }
         if(teamer[0].matchSelPlayers.batsman.length <   j) {
            return  alert(`Please select more batsman  to generate this combination. wk(` + i + `) | bat(` + j + `) | all(` + k + `) | bwl(` + l + `)`);
         }
         if(teamer[0].matchSelPlayers.allRounder.length <  k) {
            return  alert(`Please select more all rounder to generate this combination. wk(` + i + `) | bat(` + j + `) | all(` + k + `) | bwl(` + l + `)`);
         }
         if(teamer[0].matchSelPlayers.bowler.length <  l) {
            return  alert(`Please select more bowler to generate this combination. wk(` + i + `) | bat(` + j + `) | all(` + k + `) | bwl(` + l + `)`);
         }
      }
      fulldata.forEach((pl, ix) => {
         player(pl.team);

         if ((ix + 1) == fulldata.length) {
            debugger;
            setTimeout(() => {
               if(creditOfHundredPlayerList.length == 0){
                  if(teamer[0].matchSelPlayers.wckeeper.length <   i ){
                   return  alert(`Please select more wicket keeper to generate this combination. wk(` + i + `) | bat(` + j + `) | all(` + k + `) | bwl(` + l + `)`);
                  }
                  if(teamer[0].matchSelPlayers.batsman.length <  j) {
                     return  alert(`Please select more batsman  to generate this combination. wk(` + i + `) | bat(` + j + `) | all(` + k + `) | bwl(` + l + `)`);
                  }
                  if(teamer[0].matchSelPlayers.allRounder.length <   k) {
                     return  alert(`Please select more all rounder to generate this combination. wk(` + i + `) | bat(` + j + `) | all(` + k + `) | bwl(` + l + `)`);
                  }
                  if(teamer[0].matchSelPlayers.bowler.length <  l) {
                     return  alert(`Please select more bowler to generate this combination. wk(` + i + `) | bat(` + j + `) | all(` + k + `) | bwl(` + l + `)`);
                  }
               }else{
                  $("#totalGenCount").text(creditOfHundredPlayerList.length + ' Teams Generated.');

                  creditOfHundredPlayerList.forEach((p,inx )=> {
                     var sortItem = _.sortBy(p.players, 'pt').reverse();
   
                     const capvc = {
                        players: p.players,
                        cap: sortItem[0],
                        vc: sortItem[1],
                        credit: p.credit
                     }
                     generateTeamWithCapVC.push(capvc);
                     console.log(capvc)
                     loadGenerateTeam(capvc);
   
                    
                     //   p['capvc'] = capvc;
                  })
               }
              




            })
         }


      })
   })



   // gener
}

function loadGenerateTeam(gteams) {

   let c = gteams.cap;
   let vc = gteams.vc;
   let credit = gteams.credit;
   let img = ''

   var wk = "", bat = "", all = "", bwl = "";
   var bateam = "", wkteam = "", allteam = "", bwlteam = "";



   gteams.players.forEach((p, ix) => {

      img = '';


      //   if (c.id == p.id) {
      //       role = `<div class="c">c</div>`;

      //    } else if (vc.id == p.id) {
      //       role = `<div class="c">vc</div>`;
      //    } else {
      //       role = `<div></div>`;
      //    }
      let cvc = "";
      if (c.id == p.id) {
         cvc = '<div class="cvc cap">c</div>'
      }
      else if (vc.id == p.id) {
         cvc = '<div class="cvc">vc</div>'
      } else {
         cvc = "";
      }
      if (p.team.includes("-WK")) {
         img = "../img/wk.svg";
         wk = wk + ` 

         <div class="sp">`+ cvc + `
         <div class="text-center img"><img width="20" src="`+ img + `" /></div>
         <div class="text-center name">`+ p.playerName + `</div>
         
         <div class="text-center pt">`+ p.pt + `</div>
         <div class="text-center role">WK</div>
        </div>
        
         `;
      } else if (p.team.includes("-BAT")) {
         img = "../img/bat.svg";
         bat = bat + ` 
         <div class="sp">`+ cvc + `
         <div class="text-center img"><img width="20" src="`+ img + `" /></div>
         <div class="text-center name">`+ p.playerName + `</div>
         
         <div class="text-center pt">`+ p.pt + `</div>
         <div class="text-center role">BAT</div>
        </div>
        
         `;
      } else if (p.team.includes('-ALL')) {
         img = "../img/all.svg";
         all = all + ` 
         <div class="sp">`+ cvc + `
         <div class="text-center img"><img width="20" src="`+ img + `" /></div>
         <div class="text-center name">`+ p.playerName + `</div>
         
         <div class="text-center pt">`+ p.pt + `</div>
         <div class="text-center role">All</div>
        </div>
         
         `;
      } else if (p.team.includes('-BOWL')) {
         img = "../img/bwl.svg";
         bwl = bwl + ` 
         <div class="sp">`+ cvc + `
         <div class="text-center img"><img width="20" src=`+ img + ` ></div>
         <div class="text-center name">`+ p.playerName + `</div>
         
         <div class="text-center pt">`+ p.pt + `</div>
         <div class="text-center role">Bowl</div>
        </div>
        
         `;
      }











   });



   setTimeout(() => {
      wkteam = `<div class="gp gwk">
      <div class="text-center row d-flex justify-content-center mb-4">
         `+ wk + `
      </div>
      </div>
     
         
        `

      bateam = `<div class="gp gwk">
           <div class="text-center row d-flex justify-content-center mb-4">
              `+ bat + `
           </div>
           </div>
          `  ;
      allteam = `<div class="gp gwk">
           <div class="text-center row d-flex justify-content-center mb-4">
              `+ all + `
           </div>
           </div>
          `  ;
      bwlteam = `<div class="gp gwk">
           <div class="text-center row d-flex justify-content-center mb-1">
              `+ bwl + `
           </div>
           </div>
          `  ;

      $("#generatedTeam").append(
         `<div class="gteam-div"><p class="pl-2 mb-0">Total credit =` + credit + `</p><div class="genteam">` + wkteam + bateam + allteam + bwlteam + `</div></div>`);
   })

}

