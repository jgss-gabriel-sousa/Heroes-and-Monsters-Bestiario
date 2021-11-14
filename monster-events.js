function showSpell(id){
    const element = document.getElementById("spell-"+id+"-info");

    if(element.style.display == "none") {
        element.style.display = "block";
    } 
    else{
        element.style.display = "none";
    }
}