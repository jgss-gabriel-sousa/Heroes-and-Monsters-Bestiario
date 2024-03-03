const SpinnerLoading = document.querySelector("#loading")
const MonsterList = document.querySelector('[data-js="bestiario"]');

const apiURL = "https://gp-tycoon-web-service.onrender.com/hnm";
const imgApiURL = "https://raw.githubusercontent.com/JGSS-GabrielSousa/RPG-Image-API/main/monster/";
const GetMonsterUrl = id => apiURL+`/monster/${monstersList[id]}`;
let TotalNumberOfMonsters;
let NumberOfMonstersToLoadByStep;
let loaded = 0;
let allLoaded = false;
let viewingMonster;
let loadingContent = false;
let monstersList = [];
let monsters;

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

const generatePromises = toLoad => Array(toLoad).fill().map((_, index) =>
    fetch(GetMonsterUrl(index+loaded)).then(response => response.json()))

function generateHTML(monster){
    monsters = monster;

    if(document.querySelectorAll(".monster-element").length == TotalNumberOfMonsters)
        return;

    return monster.reduce((accumulator, {name, type, english_name, source, challenge_ratio}) => {
        let link;

        if(window.location.href.includes("index"))
            link = window.location.href.substring(0, window.location.href.length-11) + "/monster.html?id=" + accentsTidy(name).replace(/ /g, "+");
        else
            link = window.location.href + "monster.html?id=" + accentsTidy(name).replace(/ /g, "+");

        accumulator += `
        <li class="monster-element ${name.replace(/ /g, "-")} ND${challenge_ratio} `

        for(let i = 0; i < source.length; i++){
            accumulator += " source-"+source[i];
        }
        
        accumulator += ` type-${blankSpaceFix(accentsTidy(type))}">
            <a href="${link}" target="_self">
            <div class="card highlight-on-hover ${blankSpaceFix(accentsTidy(type))}" onclick="viewMonster('${accentsTidy(name)}')">
                <img class="card-image" alt="${name}" src="${imgApiURL + english_name.toLowerCase()}.webp" />
            </div>
            </a>
            <h2 class="card-title">${name}</h2>
            <p class="card-subtitle">${type} (${NDFormat(challenge_ratio)})</p>
        </li>
        `
        return accumulator
    }, '');
}

const insertMonsterIntoPage = monster => {
    if(!monster) return;
    
    MonsterList.innerHTML += monster;
    
    loaded += NumberOfMonstersToLoadByStep;
    if(loaded > TotalNumberOfMonsters){
        loaded = TotalNumberOfMonsters;
        allLoaded = true;
    }
    else if(loaded == TotalNumberOfMonsters){
        allLoaded = true;
    }

    SpinnerLoading.style.display = "none";
    filter();
}

function viewMonster(id){
    savePageState();
    viewingMonster = true;
}

function checkScroll(){
    if(!allLoaded && !loadingContent && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        loadingContent = true;
        SpinnerLoading.style.display = "block";
        scrollTo(0, (window.innerHeight + window.pageYOffset));
        loadMonster();

        clearInterval(checkScrollInterval);
        setTimeout( () => {
            checkScrollInterval = setInterval(checkScroll, 500);
        }, 500);
        loadingContent = false;
    }
    if(allLoaded){
        loadFinished = true;
        SpinnerLoading.style.display = "none";
        clearInterval(checkScrollInterval);
        filter();
    }
}

function savePageState(){
    sessionStorage.setItem("html", MonsterList.innerHTML);
    sessionStorage.setItem("saved", true);
    sessionStorage.setItem("scroll", window.pageYOffset);
    sessionStorage.setItem("loaded", loaded);
    sessionStorage.setItem("allLoaded", allLoaded);
    sessionStorage.setItem("filter-by-type", document.querySelector("#filter-by-type").selectedIndex);
}

function pageStateUpdate(){
    if(sessionStorage.getItem("saved") != null){
        loaded = parseInt(sessionStorage.getItem("loaded"));

        if(sessionStorage.getItem("allLoaded") == "true"){
            allLoaded = true;
        }
        else{
            allLoaded = false;
        }

        MonsterList.innerHTML = sessionStorage.getItem("html");
        setTimeout(() => {
            scrollTo(0, sessionStorage.getItem("scroll"));
        }, 500);

        document.querySelector("#filter-by-type").selectedIndex = sessionStorage.getItem("filter-by-type");
    }
    else{
        setTimeout(() => {
            scrollTo(0, 0);
        }, 500);
    }
}

function loadMonster(){
    if(loaded < TotalNumberOfMonsters){
        SpinnerLoading.style.display = "block";

        let toLoad;
        if(NumberOfMonstersToLoadByStep+loaded > TotalNumberOfMonsters){
            toLoad = TotalNumberOfMonsters-loaded;
        }
        else{
            toLoad = NumberOfMonstersToLoadByStep;
        }

        const monsterPromises = generatePromises(toLoad);

        Promise.all(monsterPromises)
            .then(generateHTML)
            .then(insertMonsterIntoPage);
    }
}

pageStateUpdate();
loadMonster();
var checkScrollInterval = setInterval(checkScroll, 500);

window.addEventListener("beforeunload", function(){
    if(!viewingMonster){
        sessionStorage.clear();
    }
 }, false);

window.onload = async function getMonstersTotal() {
    const response = await fetch("https://gp-tycoon-web-service.onrender.com/hnm");
    api_info = await response.json();
    TotalNumberOfMonsters = api_info.monster.length;
    monstersList = api_info.monster;
    NumberOfMonstersToLoadByStep = TotalNumberOfMonsters;
};