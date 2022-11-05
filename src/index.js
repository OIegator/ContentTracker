import {RAWG} from "./api/rawg";
import * as d3 from "d3";

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

const DUMMY_DATA = [
    {id: 'd1', value: 10, region: 'Jan'},
    {id: 'd2', value: 11, region: 'Feb'},
    {id: 'd3', value: 12, region: 'Mar'},
    {id: 'd4', value: 6, region: 'Apr'},
    {id: 'd5', value: 0, region: 'May'},
    {id: 'd6', value: 0, region: 'Jun'},
    {id: 'd7', value: 0, region: 'Jul'},
    {id: 'd8', value: 0, region: 'Aug'},
    {id: 'd9', value: 0, region: 'Sept'},
    {id: 'd10', value: 0, region: 'Oct'},
    {id: 'd11', value: 0, region: 'Nov'},
    {id: 'd12', value: 2, region: 'Dec'},
];

const MARGIN = {top: 20, bottom: 10};
const CHART_WIDTH = 1200;
const CHART_HEIGHT = 400 - MARGIN.top - MARGIN.bottom;

const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

x.domain(DUMMY_DATA.map((dataPoint) => dataPoint.region));
y.domain([0, d3.max(DUMMY_DATA, d => d.value) + 3]);

const chartContainer = d3
    .select("svg")
    .attr("width", CHART_WIDTH)
    .attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom);

const chart = chartContainer.append("g");

chart
    .append("g")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr("transform", `translate(0,${CHART_HEIGHT})`)
    .classed("axis", true)

function renderChart() {
    chart
        .selectAll(".bar")
        .remove();

    chart
        .selectAll(".bar")
        .data(DUMMY_DATA)
        .enter()
        .append("rect")
        .classed("bar", true)
        .attr("width", x.bandwidth())
        .attr("height", data => CHART_HEIGHT - y(data.value))
        .attr("x", data => x(data.region))
        .attr("y", data => y(data.value));
}

renderChart();

setTimeout(() => {
    DUMMY_DATA[0].value = 3;
    renderChart();
}, 2000);

setTimeout(() => {
    DUMMY_DATA[0].value = 5;
    renderChart();
}, 4000);