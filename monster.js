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


function generateHTML() {
    let title = monster.name;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    document.querySelector("title").innerHTML = title;

    document.querySelector(".container h1").innerHTML = monster.name;

    document.querySelector(".container h3").innerHTML = `${monster.type}, ${monster.size}`;

    document.querySelector(".monster-image").alt = monster.name;
    document.querySelector(".monster-image").src = `https://raw.githubusercontent.com/JGSS-GabrielSousa/DnD-Image-API/main/monster/${monster.englishName.toLowerCase()}.png`;
    document.querySelector(".monster-image").classList.add(monster.types[0].type.name);

    document.querySelector("#xp-bar").innerText = monster.base_experience;
    document.querySelector("#xp-bar").style.width = ((monster.base_experience/608)*100).toString()+"%";
}


function goBack() {
    location.href = "index.html";
}


getMonsterData();