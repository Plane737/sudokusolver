//sudoku solver

//DOM
const body = document.querySelector("body");


//brett
let brett2 = [
  [4,6,7,9,2,1,3,5,8],
  [8,9,5,4,7,3,2,6,1],
  [2,3,1,8,6,5,7,4,1],
  [5,1,3,6,9,8,4,2,7],
  [9,2,8,7,0,4,6,1,3],
  [7,4,6,1,3,2,9,8,5],
  [3,5,4,2,8,7,1,9,6],
  [1,8,9,3,4,6,5,7,2],
  [6,7,2,5,1,9,8,3,4],
];

let brett = [
  [8,0,0,9,3,0,0,0,2],
  [0,0,9,0,0,0,0,4,0],
  [7,0,2,1,0,0,9,6,0],
  [2,0,0,0,0,0,0,9,0],
  [0,6,0,0,0,0,0,7,0],
  [0,7,0,0,0,6,0,0,5],
  [0,2,7,0,0,8,4,0,6],
  [0,3,0,0,0,0,5,0,0],
  [5,0,0,0,6,2,0,0,8],
];

//print ut

function printBrett(brett){
  let table = document.createElement("table");
  for(let i = 0; i < brett.length;i++){
    let tr = document.createElement("tr");
    for(let j = 0; j < brett[i].length;j++){
      let td = document.createElement("td");
      td.innerHTML = brett[i][j];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  body.appendChild(table);
}


printBrett(brett);



//løser

function testOmFerdig(brett){
  for(let i = 0; i < brett.length; i++){
    for(let j = 0; j< brett[i].length; j++){
      if(brett[i][j]===0){
        console.log(i+ " " +j + " har null")
        return false;
      }
    }
  }
  return true;
}


function hentBoks(brett,rad,rekke){
  let boks = new Array;
  if(rad < 3){
    rad = 0;
  } else if(rad < 6){
    rad = 3;
  } else{
    rad = 6;
  }
  if(rekke < 3){
    rekke = 0;
  } else if(rekke < 6){
    rekke = 3;
  } else{
    rekke = 6;
  }
  for(let i = rad; i < (rad + 3) ; i++){
    for(let j = rekke; j < (rekke + 3); j++){
      boks.push(brett[i][j]);
    }
  }
  return boks

}
hentBoks(brett,3,2);

//rad --> rekke ned
function sjekkMulige(brett,rad,rekke){
  let muligeVerdier = [1,2,3,4,5,6,7,8,9];

  //horisontalt
  for(let i = 0; i < brett[rad].length; i++){
    for(let j = 0; j < muligeVerdier.length; j++){
      if(brett[rad][i]=== muligeVerdier[j]){
        muligeVerdier.splice(j,1);
      }
    }
  }

  //vertikalt
  for(let i = 0; i < 9; i++){

    for(let j = 0; j < muligeVerdier.length; j++){

      if(brett[i][rekke]=== muligeVerdier[j]){
        muligeVerdier.splice(j,1);
      }
    }
  }

  //boks
  let boks = hentBoks(brett,rad,rekke);
  for(let i = 0; i < boks.length; i++){
    for(let j = 0; j < muligeVerdier.length; j++){
      if(boks[i]=== muligeVerdier[j]){
        muligeVerdier.splice(j,1);
      }
    }
  }
  


  return muligeVerdier;
 
}


let b = 0;

while(b < 2000){
  for(let i = 0; i < brett.length; i++){
    for(let j = 0; j < brett[i].length; j++){
      if(brett[i][j]!== 0){
        continue;
      }
      
      let mulige = sjekkMulige(brett, i, j)
      if(mulige.length === 1){
        console.log("Fant en " + i+" "+"  "+j+" "+ mulige[0]);
        console.log(mulige);
        brett[i][j]=mulige[0];
      
      }
    }
  }
  
  b++;
}

printBrett(brett);

