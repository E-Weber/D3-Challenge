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

    // cast the data from the csv as numbers
    povdata.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.heathcare;
        //console.log(data.state, data.poverty, data.healthcare, data.abbr)
    });

    // create scale for your independent (x) coordinates
    var xScale = d3.scaleLinear()
        .domain(d3.extent(povdata, d => d.poverty))
        .range([0, svgWidth]);

    // create scale for your dependent (y) coordinates
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(povdata, d => d.healthcare)])
        .range([svgHeight, 0]);

    // create axes
    var xAxis = d3.axisBottom(xScale).tickFormat();
    var yAxis = d3.axisBottom(yScale).ticks(6);

    // append axes

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);
});



