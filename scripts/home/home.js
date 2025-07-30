import { filter } from "./filter.js";

const SpinnerLoading = document.querySelector("#loading")
const MonsterList = document.querySelector('[data-js="bestiario"]');

const apiURL = "https://jgss-web-service.onrender.com/hnm";
const imgApiURL = "../img/monsters/";

function accentsTidy(s){
    var r = s.toLowerCase();
    const non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
    for (let i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
    return r;
}

function blankSpaceFix(s){
    return s.replace(/\s/g, "_");
}

function NDFormat(nd){
    if(nd == 0.5)           return "1/2";
    else if(nd == 0.25)     return "1/4";
    else if(nd == 0.125)    return "1/8";
    return nd;
}

function renderMonsters(monsters){
    for (const monsterName in monsters) {
        const monster = monsters[monsterName];     
        let link;
        let html = "";

        html += `<li `

        html += `data-source="`;
        for(let i = 0; i < monster.source.length; i++){
            html += monster.source[i];

            if(i != monster.source.length-1)
                html += `,`;
        }
        html += `"`;

        html += `class="monster-element ${monsterName.replace(/ /g, "-")} ND${monster.challenge_ratio} `
        
        
        if(window.location.href.includes("index"))
            link = window.location.href.substring(0, window.location.href.length-11) + "/monster.html?id=" + accentsTidy(monster.name).replace(/ /g, "+");
        else
            link = window.location.href + "monster.html?id=" + accentsTidy(monster.name).replace(/ /g, "+");

        html += ` type-${blankSpaceFix(accentsTidy(monster.type))}">
            <a href="${link}" target="_self">
            <div class="card highlight-on-hover ${blankSpaceFix(accentsTidy(monster.type))}" onclick="viewMonster('${accentsTidy(monster.name)}')">
                <img class="card-image" alt="${monster.name}" src="${imgApiURL + monster.english_name.toLowerCase()}.webp" />
            </div>
            </a>
            <h2 class="card-title">${monster.name}</h2>
            <p class="card-subtitle">${monster.type} (${NDFormat(monster.challenge_ratio)})</p>
        </li>`

        MonsterList.innerHTML += html;
    }
}

function renderPage(){
    SpinnerLoading.style.display = "none";
    filter();
}

function viewMonster(id){
    savePageState();
}

async function getMonstersCache(){
    const monstersCached = JSON.parse(localStorage.getItem("hnm-bestiary-monsters"));

    if(monstersCached){
        if(Date.now() - monstersCached.date > 3600000){
            localStorage.removeItem("hnm-bestiary-monsters");
            return null;
        }

        return monstersCached.monsters;
    }
    return null;
}

function saveMonstersCache(monsters){
    localStorage.setItem("hnm-bestiary-monsters", JSON.stringify(
        {
            monsters: monsters,
            date: Date.now()
        })
    );
}

async function loadMonsters(){
    let monsters = await getMonstersCache();

    if(monsters){
        return monsters;
    }
    else{
        const response = await fetch(apiURL);
        let monstersList = await response.json();
        monstersList = monstersList["hnm/bestiary"];
    
        const fetchPromises = monstersList.map(async keyMonster => {
            const response = await fetch(`${apiURL}/query-${keyMonster}`);
            const monster = await response.json();
            return monster;
        });
    
        const monstersArray = await Promise.all(fetchPromises);
        
        monsters = {};
        monstersArray.forEach(monster => {
            monsters[monster.name] = monster;
        });
    
        saveMonstersCache(monsters);
        return monsters;
    }
} 

loadMonsters()
    .then(monsters => {
        renderMonsters(monsters);
        renderPage();

    }).catch(error => {
        console.error("Error loading monsters:", error);
    });


window.addEventListener("beforeunload", e => {
    if(!viewingMonster){
        sessionStorage.clear();
    }
}, false);
