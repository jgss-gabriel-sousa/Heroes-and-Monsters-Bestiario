let activeFiltersKeys = ["all","all"];

function filter(){
    const array = document.querySelectorAll(".monster-element");

    for(let i = 0, x = 0; i < array.length; i++){
        x = 0;

        for (let j = 0; j < activeFiltersKeys.length; j++) {
            if(activeFiltersKeys[j] == "all" || array[i].classList.contains(activeFiltersKeys[j]))
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

    //document.getElementById("filter-by-source").selectedIndex = 0;

    activeFiltersKeys[0] = event.target.value;
    filter();
});

document.getElementById("filter-by-source").addEventListener('change', (event) => {
    //document.getElementById("filter-by-type").selectedIndex = 0;

    activeFiltersKeys[1] = event.target.value;
    filter();
});


filter();