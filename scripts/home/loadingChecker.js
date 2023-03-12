let loadFinished = false;
let loadStartTime = new Date();

const loadingCheck = setInterval(loadingChecker,1000);

function loadingChecker(){
    const currentTime = new Date();
    const difference = currentTime - loadStartTime;

    if(loadFinished) clearInterval(loadingCheck);

    console.log(difference);

    if(difference >= 5000){
        document.querySelector("#slow-loading-advert").style.display = "flex";
    }
}

document.querySelector("#close-btn").addEventListener("click", e => {
    document.querySelector("#slow-loading-advert").style.display = "none";
});