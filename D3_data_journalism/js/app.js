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

// append gropu element
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// load data
d3.csv("./D3_data_journalism/data/data.csv").then(function (povdata) {
    console.log(povdata);

    // cast the data from the csv as numbers
    povdata.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        console.log(data.state, data.poverty, data.healthcare, data.abbr)
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
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // append axes
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // create circles
    var circlesGroup = chartGroup.selectAll("cirlce")
        .data(povdata)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".7")
        .attr("stroke-width", "1")
        .attr("stroke", "black");


    // abbr in circles
    chartGroup.selectAll("text.text-circles")
        .data(povdata)
        .enter()
        .append("text")
        .classed("text-circles", true)
        .text(d => d.abbr)
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare))
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
    //.attr("font-color", "white");

    // x axis text
    chartGroup.append("text")
        .attr("x", 350)
        .attr("y", 630)
        //.attr("dy", "1em")
        .classed("axis-text", true)
        .text("In Poverty (%)");

    // y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -5 - chartMargin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Lacks Healthcare (%)");
});


