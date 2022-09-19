let activeFiltersKeys = ["all","all","all","1/8","30"];

const TYPE = 0;
const SOURCE = 1;
const NAME = 2;
const MIN_ND = 3;
const MAX_ND = 4;

function formatNDRange(value){
    if(value == -2) return "1/8";
    if(value == -1) return "1/4";
    if(value == 0) return "1/2";
    return value;
}

function filter(){
    const monsters = document.querySelectorAll(".monster-element");
    
    for(let i = 0, x = 0; i < monsters.length; i++){
        x = 0;
        const ND = parseFloat(monsters[i].classList[2].slice(2));

        for (let j = 0; j < activeFiltersKeys.length; j++) {
            if(j == NAME){
                if(activeFiltersKeys[j] == "all" || monsters[i].classList[1].includes(activeFiltersKeys[NAME]) || accentsTidy(monsters[i].classList[1]).includes(activeFiltersKeys[NAME]))
                    x++;
            }
            else if(j == MIN_ND){
                if(ND < 1){
                    let ndNumber;

                    if(activeFiltersKeys[MIN_ND] == "1/8") ndNumber = 0.125;
                    if(activeFiltersKeys[MIN_ND] == "1/4") ndNumber = 0.25;
                    if(activeFiltersKeys[MIN_ND] == "1/2") ndNumber = 0.5;

                    if(ND >= ndNumber){
                        x++;   
                    }
                }
                else if(ND >= parseInt(activeFiltersKeys[MIN_ND])){
                    x++;
                }
            }
            else if(j == MAX_ND){
                if(ND <= 1){
                    let ndNumber;

                    if(activeFiltersKeys[MAX_ND] == "1/8") ndNumber = 0.125;
                    else if(activeFiltersKeys[MAX_ND] == "1/4") ndNumber = 0.25;
                    else if(activeFiltersKeys[MAX_ND] == "1/2") ndNumber = 0.5;
                    else ndNumber = parseInt(activeFiltersKeys[MAX_ND]);

                    if(ND <= ndNumber){
                        x++;
                    }
                }
                else if(ND <= parseInt(activeFiltersKeys[MAX_ND])){
                    x++;
                }
            }
            else if(activeFiltersKeys[j] == "all" || monsters[i].classList.contains(activeFiltersKeys[j]))
                x++;
        }

        if(x == activeFiltersKeys.length){
            monsters[i].classList.add("show");
        }
        else{
            monsters[i].classList.remove("show");
        }
    };
}

document.getElementById("filter-by-type").addEventListener('change', (event) => {
    activeFiltersKeys[TYPE] = event.target.value;
    filter();
});

document.getElementById("filter-by-source").addEventListener('change', (event) => {
    activeFiltersKeys[SOURCE] = event.target.value;
    filter();
});

document.getElementById("filter-by-name").addEventListener('input', (event) => {
    activeFiltersKeys[NAME] = event.target.value.replace(/ /g, "-");
    filter();
});

document.getElementById("minNDRange").addEventListener('change', (event) => {
    activeFiltersKeys[MIN_ND] = formatNDRange(parseInt(event.target.value)-2);
    document.getElementById("minNDRangeValue").innerText = formatNDRange(parseInt(event.target.value)-2);
    filter();
});

document.getElementById("maxNDRange").addEventListener('change', (event) => {
    activeFiltersKeys[MAX_ND] = formatNDRange(parseInt(event.target.value)-2);
    document.getElementById("maxNDRangeValue").innerText = formatNDRange(parseInt(event.target.value)-2);
    filter();
});