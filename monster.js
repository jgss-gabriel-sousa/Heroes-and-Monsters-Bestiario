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


function generateHTML() {
    let title = monster.name;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    document.querySelector("title").innerHTML = title;

    document.querySelector(".container h1").innerHTML = monster.name;

    document.querySelector(".container h3").innerHTML = `${monster.type}, ${monster.size}`;

    document.querySelector(".monster-image").alt = monster.name;
    document.querySelector(".monster-image").src = `https://raw.githubusercontent.com/JGSS-GabrielSousa/DnD-Image-API/main/monster/${monster.english_name.toLowerCase()}.png`;

    document.querySelector("#atk-bar").innerText = convertNumberToFraction(monster.atk_cr);
    document.querySelector("#atk-bar").style.width = ((monster.atk_cr/30)*100).toString()+"%";
    
    document.querySelector("#dmg-bar").innerText = convertNumberToFraction(monster.damage_cr);
    document.querySelector("#dmg-bar").style.width = ((monster.damage_cr/30)*100).toString()+"%";

    document.querySelector("#res-bar").innerText = convertNumberToFraction(monster.resistances_and_immunities_cr);
    document.querySelector("#res-bar").style.width = ((monster.resistances_and_immunities_cr/30)*100).toString()+"%";

    document.querySelector("#hp-bar").innerText = convertNumberToFraction(monster.hp_cr);
    document.querySelector("#hp-bar").style.width = ((monster.hp_cr/30)*100).toString()+"%";

    document.querySelector("#def-bar").innerText = convertNumberToFraction(monster.defense_cr);
    document.querySelector("#def-bar").style.width = ((monster.defense_cr/30)*100).toString()+"%";

}


function goBack() {
    location.href = "index.html";
}


getMonsterData();