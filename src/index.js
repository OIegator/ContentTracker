import {RAWG} from "./api/rawg";
import * as d3 from "d3";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    Initialize();
    document.getElementById('submit').onclick = submitIt;
}

function SetGame(id = "pyre") {
    const rawg = new RAWG();
    rawg.games(id).then(data => {
        const listContainer = document.getElementById("gamesList")
        RenderGame(data, listContainer);
    })
}

function RenderGame(data, container) {
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

function submitIt() {
    const gameName = document.getElementById('game-name').value;
    DUMMY_DATA[month2int.get(selected.innerText)].value++;
    renderChart();
    SetGame(gameName);
}

const listOfGames = [
    {name: "transistor", month: "January"}, {name: "final-fantasy-vii-remake", month: "January"},
    {name: "pyre", month: "January"}, {name: "guardians-of-the-galaxy", month: "February"},
    {name: "horizon-zero-dawn-2", month: "March"}, {name: "ori-and-the-blind-forest", month: "May"},
    {name: "ori-and-the-will-of-the-wisps", month: "May"}, {name: "tunic", month: "August"},
    {name: "teenage-mutant-ninja-turtles-shredders-revenge", month: "August"},
    {name: "a-plague-tale-innocence", month: "August"}, {name: "Dishonored", month: "August"},
    {name: "man-of-medan", month: "August"}, {name: "what-remains-of-edith-finch", month: "September"},
    {name: "silent-hill-2", month: "September"}, {name: "deathloop-2", month: "October"},
    {name: "a-plague-tale-requiem", month: "October"}];

function Initialize() {
    listOfGames.forEach(game => {
        DUMMY_DATA[month2int.get(game.month)].value++;
        renderChart();
        SetGame(game.name)
    })
}

const DUMMY_DATA = [
    {id: 'd1', value: 0, month: 'Jan'},
    {id: 'd2', value: 0, month: 'Feb'},
    {id: 'd3', value: 0, month: 'Mar'},
    {id: 'd4', value: 0, month: 'Apr'},
    {id: 'd5', value: 0, month: 'May'},
    {id: 'd6', value: 0, month: 'Jun'},
    {id: 'd7', value: 0, month: 'Jul'},
    {id: 'd8', value: 0, month: 'Aug'},
    {id: 'd9', value: 0, month: 'Sep'},
    {id: 'd10', value: 0, month: 'Oct'},
    {id: 'd11', value: 0, month: 'Nov'},
    {id: 'd12', value: 0, month: 'Dec'},
];

const month2int = new Map([
    ["January", 0],
    ["February", 1],
    ["March", 2],
    ["April", 3],
    ["May", 4],
    ["June", 5],
    ["July", 6],
    ["August", 7],
    ["September", 8],
    ["October", 9],
    ["November", 10],
    ["December", 11],
])

const MARGIN = {top: 20, bottom: 10};
const CHART_WIDTH = 1200;
const CHART_HEIGHT = 400 - MARGIN.top - MARGIN.bottom;

const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

x.domain(DUMMY_DATA.map((dataPoint) => dataPoint.month));
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
        .attr("x", data => x(data.month))
        .attr("y", data => y(data.value));
}

renderChart();

//--------------DROPDOWN--------------------------

const dropdown = document.getElementById("month-picker")

const select = dropdown.querySelector(".select");
const caret = dropdown.querySelector(".caret");
const menu = dropdown.querySelector(".menu");
const options = dropdown.querySelectorAll(".menu li");
const selected = dropdown.querySelector(".selected");

console.log(selected.innerText)

select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
});

options.forEach(option => {
    option.addEventListener("click", () => {
        selected.innerText = option.innerText;
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        options.forEach(option => {
            option.classList.remove("active");
        });
        option.classList.add("active");
    });
});


