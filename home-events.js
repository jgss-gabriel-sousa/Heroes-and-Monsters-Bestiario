function filterByType(typeToStay){
    const arrayElem = document.querySelectorAll(".monster-element");
    const arrayCard = document.querySelectorAll(".card");

    for (let i = 0; i < arrayCard.length; i++) {
        arrayElem[i].style.display = "block";
        
        if(typeToStay != "null" && !arrayCard[i].classList.contains(typeToStay)){
            arrayElem[i].style.display = "none";
        }
    };
}

document.getElementById("filter-by-type").addEventListener('change', (event) => {
    filterByType(event.target.value);
});