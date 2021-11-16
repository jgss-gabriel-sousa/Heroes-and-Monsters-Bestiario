function showSpell(id){
    const element = document.getElementById("spell-"+id+"-info");

    if(element.style.display == "none") {
        element.style.display = "block";
        document.getElementById("showSpell-"+id+"-button").innerText = "-";
    } 
    else{
        element.style.display = "none";
        document.getElementById("showSpell-"+id+"-button").innerText = "+";
    }
}