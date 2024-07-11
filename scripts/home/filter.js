let activeFiltersKeys = ["all","all","all","1/8","30"];

const TYPE = 0;
const SOURCE = 1;
const NAME = 2;
const MIN_ND = 3;
const MAX_ND = 4;

function formatNDRange(value){
    if(value == -2) return "1/8";
    if(value == -1) return "1/4";
    if(value == 0)  return "1/2";
    return value;
}

function filter() {
    const monsters = document.querySelectorAll(".monster-element");

    monsters.forEach((monster) => {
        let matchingFilters = 0;

        const nd = parseFloat(monster.classList[2].slice(2));

        activeFiltersKeys.forEach((filterKey, index) => {
            if (index === NAME) {
                if (filterKey === "all" || monster.classList[1].includes(filterKey) || accentsTidy(monster.classList[1]).includes(filterKey)) {
                matchingFilters++;
                }
            } else if (index === MIN_ND) {
                if (nd < 1) {
                    const ndNumber = { "1/8": 0.125, "1/4": 0.25, "1/2": 0.5 }[filterKey];
                if (nd >= ndNumber) {
                    matchingFilters++;   
                }
                } else if (nd >= parseInt(filterKey)) {
                    matchingFilters++;
                }
            } else if (index === MAX_ND) {
                if (nd <= 1) {
                    const ndNumber = { "1/8": 0.125, "1/4": 0.25, "1/2": 0.5 }[filterKey] || parseInt(filterKey);
                if (nd <= ndNumber) {
                    matchingFilters++;
                }
                } else if (nd <= parseInt(filterKey)) {
                    matchingFilters++;
                }
            } else {
                if (filterKey === "all" || monster.classList.contains(filterKey)) {
                    matchingFilters++;
                }
            }
        });

        if (matchingFilters === activeFiltersKeys.length) {
            monster.classList.add("show");
        } else {
            monster.classList.remove("show");
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
    document.getElementById("minNDRangeValue").innerText = formatNDRange(parseInt(event.target.value)-2);
    activeFiltersKeys[MIN_ND] = formatNDRange(parseInt(event.target.value)-2);
    filter();
});

document.getElementById("maxNDRange").addEventListener("input", (event) => {
    document.getElementById("maxNDRangeValue").innerText = formatNDRange(parseInt(event.target.value)-2);
    activeFiltersKeys[MAX_ND] = formatNDRange(parseInt(event.target.value)-2);
    filter();
});