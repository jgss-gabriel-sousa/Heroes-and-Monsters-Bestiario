import { accentsTidy } from "../utils.js";

let activeFiltersKeys = ["all","all","all","1/8","30"];

const TYPE = 0;
const SOURCE = 1;
const NAME = 2;
const MIN_ND = 3;
const MAX_ND = 4;

function formatNDRange(value){
    if(value == 0) return "1/8";
    if(value == 1) return "1/4";
    if(value == 2)  return "1/2";
    
    return value-2;
}

export function filter() {
    const monsters = document.querySelectorAll(".monster-element");

    activeFiltersKeys[TYPE] = document.querySelector("#filter-by-type").value;
    activeFiltersKeys[SOURCE] = document.querySelector("#filter-by-source").value;
    activeFiltersKeys[NAME] = document.querySelector("#filter-by-name").value;
    activeFiltersKeys[MIN_ND] = document.querySelector("#minNDRange").value;
    activeFiltersKeys[MAX_ND] = document.querySelector("#maxNDRange").value;

    monsters.forEach((monster) => {
        let matchingFilters = [false,false,false,false,false];

        const nd = monster.classList[2].slice(2);

        activeFiltersKeys.forEach((filterKey, index) => {
            if(index === TYPE){
                if(filterKey === "all" || monster.classList[3].includes(filterKey) || accentsTidy(monster.classList[3]).includes(filterKey)){
                    matchingFilters[TYPE] = true;
                }
            } 
            else if(index === SOURCE){
                if(filterKey === "all" || monster.dataset['source'].includes(filterKey)){
                    matchingFilters[SOURCE] = true;
                }
            } 
            else if(index === NAME){
                if(filterKey === "all" || monster.classList[1].includes(filterKey) || accentsTidy(monster.classList[1]).includes(filterKey)){
                    matchingFilters[NAME] = true;
                }
            } 
            else if(index === MIN_ND || index === MAX_ND){
                let filterND = formatNDRange(filterKey);

                if(filterND == "1/2") filterND = 0.5;
                if(filterND == "1/4") filterND = 0.25;
                if(filterND == "1/8") filterND = 0.125;
                
                if(index === MIN_ND){
                    if(nd >= filterND){
                        matchingFilters[MIN_ND] = true;
                    }
                }
                if(index === MAX_ND){
                    if(nd <= filterND){
                        matchingFilters[MAX_ND] = true;
                    }
                }
            }
        });


        let visible = -matchingFilters.length;
        matchingFilters.forEach(m => {
            if(m == true){
                visible++;
            }
        });

        if (visible < 0) {
            monster.classList.add("hide");
        } else {
            monster.classList.remove("hide");
        }
    });
}

document.getElementById("filter-by-type").addEventListener("change", (event) => {
    activeFiltersKeys[TYPE] = event.target.value;
    filter();
});

document.getElementById("filter-by-source").addEventListener("change", (event) => {
    activeFiltersKeys[SOURCE] = event.target.value;
    filter();
});

document.getElementById("filter-by-name").addEventListener("input", (event) => {
    activeFiltersKeys[NAME] = event.target.value.replace(/ /g, "-");
    filter();
});

document.getElementById("minNDRange").addEventListener("input", (event) => {
    document.getElementById("minNDRangeValue").innerText = formatNDRange(parseInt(event.target.value));
    activeFiltersKeys[MIN_ND] = formatNDRange(parseInt(event.target.value));
    filter();
});

document.getElementById("maxNDRange").addEventListener("input", (event) => {
    document.getElementById("maxNDRangeValue").innerText = formatNDRange(parseInt(event.target.value));
    activeFiltersKeys[MAX_ND] = formatNDRange(parseInt(event.target.value));
    filter();
});