let activeFiltersKeys = ["all","all","all"];


function filter(){
    const array = document.querySelectorAll(".monster-element");
    
    for(let i = 0, x = 0; i < array.length; i++){
        x = 0;

        for (let j = 0; j < activeFiltersKeys.length; j++) {
            if(j == 2){
                if(activeFiltersKeys[j] == "all" || array[i].classList[1].includes(activeFiltersKeys[2]) || accentsTidy(array[i].classList[1]).includes(activeFiltersKeys[2]))
                    x++;
            }
            else if(activeFiltersKeys[j] == "all" || array[i].classList.contains(activeFiltersKeys[j]))
                x++;
        }

        if(x == activeFiltersKeys.length){
            array[i].classList.add("show");
        }
        else{
            array[i].classList.remove("show");
        }
    };
}


document.getElementById("filter-by-type").addEventListener('change', (event) => {
    activeFiltersKeys[0] = event.target.value;
    filter();
});

document.getElementById("filter-by-source").addEventListener('change', (event) => {
    activeFiltersKeys[1] = event.target.value;
    filter();
});

document.getElementById("filter-by-name").addEventListener('input', (event) => {
    activeFiltersKeys[2] = event.target.value.replace(/ /g, "-");
    filter();
});


filter();