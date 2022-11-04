import {RAWG} from "./api/rawg";


document.addEventListener("DOMContentLoaded", setup);

function setup(){
    Initialize();
    document.getElementById('submit').onclick = submitIt;
}

function SetGame(id = "pyre"){
    const rawg = new RAWG();
    rawg.games(id).then(data=>{
        const listContainer = document.getElementById("gamesList")
        RenderGame(data, listContainer);
    })
}

function RenderGame(data, container){
    const name = data.name;
    const poster = data.background_image;
    const div = document.createElement("div");
    div.setAttribute("class", "poster");
    div.innerHTML = `
            <img src=${poster} alt="">
            <div class="details">
                <h2>${name}</h2>
            </div>
    `;
    container.appendChild(div);
}

function submitIt(){
    const gameName = document.getElementById('game-name').value;
    SetGame(gameName);
}

function Initialize(){
    const listOfGames = [ "transistor", "final-fantasy-vii-remake", "pyre", "guardians-of-the-galaxy",
        "horizon-zero-dawn-2", "ori-and-the-blind-forest", "ori-and-the-will-of-the-wisps",
        "teenage-mutant-ninja-turtles-shredders-revenge", "tunic", "a-plague-tale-innocence", "Dishonored",
        "man-of-medan", "what-remains-of-edith-finch", "silent-hill-2", "deathloop-2", "a-plague-tale-requiem"]
    listOfGames.forEach(game=>{
        SetGame(game)
    })
}
