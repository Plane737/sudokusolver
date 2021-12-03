//sudoku solver

//DOM
const div = document.querySelector("div");
const btn = document.querySelector(".button");
btn.addEventListener("click",(e)=>{
  løs(hentInputBrett());

})
//Globle variabler
let kompleksitet = 0;

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
]
let brett3 = [
  [0,0,6,3,0,7,0,0,0],
  [0,0,4,0,0,0,0,0,5],
  [1,0,0,0,0,6,0,8,2],
  [2,0,5,0,3,0,1,0,6],
  [0,0,0,2,0,0,3,0,0],
  [9,0,0,0,7,0,0,0,4],
  [0,5,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0],
  [0,0,8,1,0,9,0,4,0],
]

//Funksjoner


//print ut
function printInputBrett(){
  let table = document.createElement("table");
  for(let i = 0; i < 9;i++){
    let tr = document.createElement("tr");
    for(let j = 0; j < 9;j++){
      let td = document.createElement("td");
      let input = document.createElement("input");
      input.type = "text";
      if(i % 3 === 0){
        input.style.borderTop = "3px solid blue";
      }
      if(j % 3 === 0){
        input.style.borderLeft = "3px solid blue";
      }
      input.id = `cell${i}${j}`

      td.appendChild(input);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  div.appendChild(table);
}

function hentInputBrett(){
  let brett = new Array;
  for(let i = 0; i < 9;i++){
    let indreArray = new Array;
    for(let j = 0; j < 9; j++){
      cell = document.getElementById(`cell${i}${j}`);
      if(cell.value !== ""){
        if(sjekkOmGyldigTall(cell.value)){
          indreArray.push(Number(cell.value));
          console.log(cell.value);
        } else {
          throw new Error("Ugyldig bruker input");
        }

      }else {
        indreArray.push(0);
      }

    }
    brett.push(indreArray);
  }
  return brett
}
function fjernInput(){
  div.innerHTML = "";
}
function sjekkOmGyldigTall(str){
  if(str.length !== 1){
    return false;
  }
  if(isNaN(str)){
    return false;
  }
  return true;
}

function printBrett(brett){
  let table = document.createElement("table");
  for(let i = 0; i < brett.length;i++){
    let tr = document.createElement("tr");
    for(let j = 0; j < brett[i].length;j++){
      let td = document.createElement("td");
      if(brett[i][j] === 0){
        td.innerHTML = " ";
      } else {
        td.innerHTML = brett[i][j];
      }
      if(i % 3 === 0){
        td.style.borderTop = "3px solid blue";
      }
      if(j % 3 === 0){
        td.style.borderLeft = "3px solid blue";
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  div.appendChild(table);
}





//løser

function testOmFerdig(brett){
  for(let i = 0; i < brett.length; i++){
    for(let j = 0; j< brett[i].length; j++){
      if(brett[i][j]===0){ 
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
function sjekkMulige(brett,rad,rekke,n){
  kompleksitet += 1;

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
  


  if(muligeVerdier.includes(n)){
    return true;
  } else {
    return false;
  }
 
}



function løs(brett){ 

  if(testOmFerdig(brett)){
    fjernInput();
    printBrett(brett);
    return true;
  }
  
  for(let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
      if(brett[i][j]=== 0){
        for(let n = 1; n < 10; n++){
          if(sjekkMulige(brett,i,j,n)){
            brett[i][j]=n;
            løs(brett);
            brett[i][j]=0;
          }
          
        }
        return;
      }
    }
  }
}

printInputBrett();

