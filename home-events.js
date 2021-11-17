function filterByType(typeToStay){
    const array = document.querySelectorAll(".card");

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
    
        element.style.display = "block";
        if(typeToStay != "null" && !element.classList.contains(typeToStay)){
            element.style.display = "none";
        }
    };
}

document.getElementById("filter-by-type").addEventListener('change', (event) => {
    filterByType(event.target.value);
});