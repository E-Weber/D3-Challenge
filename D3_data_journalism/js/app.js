// define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// select body, append SVG area to it, and set dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// load data
d3.csv("./D3_data_journalism/data/data.csv").then(function (povdata) {
    console.log(povdata);
    povdata.forEach(function (data) {


    })
})