const SpinnerLoading = document.querySelector("#loading")
const MonsterList = document.querySelector('[data-js="bestiario"]');

const GetMonsterUrl = id => `https://heroes-and-monsters-api.herokuapp.com/monster/${id}`
let TotalNumberOfMonsters;
const NumberOfMonstersToLoadByStep = 4
let loaded = 0;
let allLoaded = false;
let viewingMonster;


accentsTidy = function(s){
    var r = s.toLowerCase();
    non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
    for (i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
    return r;
};


const generatePromises = toLoad => Array(toLoad).fill().map((_, index) =>
    fetch(GetMonsterUrl(index+loaded)).then(response => response.json()))
    

const generateHTML = monster => monster.reduce((accumulator, {name, type, english_name}) => {

    accumulator += `
    <li class="card ${accentsTidy(type)} highlight-on-hover" onclick="viewMonster('${name}')">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/JGSS-GabrielSousa/DnD-Image-API/main/monster/200px/${english_name.toLowerCase()}.png" />
        <h2 class="card-title">${name}</h2>
        <p class="card-subtitle">${type}</p>
    </li>
    `
    return accumulator
}, '')


const insertMonsterIntoPage = monster => {
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
}


function viewMonster(id){
    savePageState();
    viewingMonster = true;

    const form = document.querySelector(".view-monster");
    const input = document.getElementById("form-value");
    input.value = id;
    form.submit();
}


function checkScroll(){
    if(allLoaded == false && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        SpinnerLoading.style.display = "block";
        scrollTo(0, (window.innerHeight + window.pageYOffset));
        setTimeout(loadMonster, 2000);

        clearInterval(checkScrollInterval);
        setTimeout( () => {
            checkScrollInterval = setInterval(checkScroll, 1000);
        }, 3000);
    }
    if(allLoaded){
        SpinnerLoading.style.display = "none";
        clearInterval(checkScrollInterval);
    }
}


function savePageState(){
    sessionStorage.setItem("html", MonsterList.innerHTML);
    sessionStorage.setItem("saved", true);
    sessionStorage.setItem("scroll", window.pageYOffset);
    sessionStorage.setItem("loaded", loaded);
    sessionStorage.setItem("allLoaded", allLoaded);
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
var checkScrollInterval = setInterval(checkScroll, 1000);

window.addEventListener("beforeunload", function(){
    if(!viewingMonster){
        sessionStorage.clear();
    }
 }, false);


window.onload = async function getMonstersTotal() {
    const response = await fetch(`https://heroes-and-monsters-api.herokuapp.com`);
    api_info = await response.json();
    TotalNumberOfMonsters = api_info.monster.length;
};