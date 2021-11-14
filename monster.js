let monster;
const id = getURLParameter("id").toLowerCase();
let evolutionChain = [];


function getURLParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}


async function getMonsterData() {
    const response = await fetch(`https://heroes-and-monsters-api.herokuapp.com/query-${id}`);
    monster = await response.json();

    generateHTML();
}


function convertNumberToFraction(value) {
    if(value < 1){
        if(typeof value == "string"){
            if(value == "0.5"){
                return "1/2";
            }
            else if(value == "0.25"){
                return "1/4";
            }
            else if(value == "0.125"){
                return "1/8";
            }
            else if(value == "0"){
                return "0";
            }
        }
        else{
            if(value == 0.5){
                return "1/2";
            }
            else if(value == 0.25){
                return "1/4";
            }
            else if(value == 0.125){
                return "1/8";
            }
            else if(value == 0){
                return "0";
            }
        }
    }
    return value
}


function addDecimalPoints(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}


function goBack() {
    location.href = "index.html";
}


getMonsterData();