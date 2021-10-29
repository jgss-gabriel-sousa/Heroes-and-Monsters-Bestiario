const spinnerLoading = document.querySelector("#loading")
const PokeList = document.querySelector('[data-js="pokedex"]');

const getPokemonUrl = id => `https://heroes-and-monsters-api.herokuapp.com/monster/${id}`
const NumberOfPokemon = 2
const NumberOfPokemonToLoad = 2
let loaded = 0;
let allLoaded = false;
let viewingPokemon;

accentsTidy = function(s){
    var r = s.toLowerCase();
    non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
    for (i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
    return r;
};

const generatePokemonPromises = toLoad => Array(toLoad).fill().map((_, index) =>
    fetch(getPokemonUrl(index+loaded)).then(response => response.json()))
    

const generateHTML = pokemon => pokemon.reduce((accumulator, {name, type, englishName}) => {

    accumulator += `
    <li class="card ${accentsTidy(type)} highlight-on-hover" onclick="viewPokemon('${name}')">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/JGSS-GabrielSousa/DnD-Image-API/main/monster/200px/${englishName.toLowerCase()}.png" />
        <h2 class="card-title">${name}</h2>
        <p class="card-subtitle">${type}</p>
    </li>
    `
    return accumulator
}, '')

    
const insertPokemonIntoPage = pokemon => {
    PokeList.innerHTML += pokemon;
    
    loaded += NumberOfPokemonToLoad;
    if(loaded > NumberOfPokemon){
        loaded = NumberOfPokemon;
        allLoaded = true;
    }
    else if(loaded == NumberOfPokemon){
        allLoaded = true;
    }

    spinnerLoading.style.display = "none";
}


function viewPokemon(id){
    savePageState();
    viewingPokemon = true;

    const form = document.querySelector(".view-pokemon-form");
    const input = document.getElementById("form-value");
    input.value = id;
    form.submit();
}


function checkScroll(){
    if(allLoaded == false && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        spinnerLoading.style.display = "block";
        scrollTo(0, (window.innerHeight + window.pageYOffset));
        setTimeout(loadPokemon, 2000);

        clearInterval(checkScrollInterval);
        setTimeout( () => {
            checkScrollInterval = setInterval(checkScroll, 1000);
        }, 3000);
    }
    if(allLoaded){
        spinnerLoading.style.display = "none";
        clearInterval(checkScrollInterval);
    }
}


function savePageState(){
    sessionStorage.setItem("html", PokeList.innerHTML);
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

        PokeList.innerHTML = sessionStorage.getItem("html");
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


function loadPokemon(){
    if(loaded < NumberOfPokemon){
        spinnerLoading.style.display = "block";

        let toLoad;
        if(NumberOfPokemonToLoad+loaded > NumberOfPokemon){
            toLoad = NumberOfPokemon-loaded;
        }
        else{
            toLoad = NumberOfPokemonToLoad;
        }
        
        const pokemonPromises = generatePokemonPromises(toLoad);

        Promise.all(pokemonPromises)
            .then(generateHTML)
            .then(insertPokemonIntoPage);
    }
}

pageStateUpdate();
loadPokemon();
var checkScrollInterval = setInterval(checkScroll, 1000);

window.addEventListener("beforeunload", function(){
    if(!viewingPokemon){
        sessionStorage.clear();
    }
 }, false);