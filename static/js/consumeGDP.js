var margin = {top: 50, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

var svg = d3.select("#consumeGDP").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("position", "absolute")
    .attr("top": "50px")
    .attr("left":"20px")
        // z-index:auto;
        // width:auto;
        // position:absolute;
        // border-style:solid;
        // border-width:medium;
        // border-color:Blue;)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white");


d3.json("/data", function(error, data) {
  if (error) throw error;
//   console.log("YAAAAAAAY");
//   console.log(data);
  data.forEach(function(d) {
    d.Total = +d.Total;
    d.GDP = +d.GDP;
  });

   x.domain(d3.extent(data, function(d) { return d.Total; })).nice();
   y.domain(d3.extent(data, function(d) { return d.GDP; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)");


  var circlesGroup = svg.selectAll(".dot")
      .data(data)
      .enter();


  var cTip  =  circlesGroup
    .append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.Total); })
      .attr("cy", function(d) { return y(d.GDP); });
      

    circlesGroup.append("text")
        .classed("stateText", true)
        .attr("x", function(d) { return x(d.Total); })
        .attr("y", function(d) { return y(d.GDP); })
        .attr("font-size", "8px")
        .style("text-anchor", "middle")
        // .text(d => d.Country_Code);

//Initialize tool tip

var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .style("background",'#BCC5F7')
    .style("border-radius", '6px')
    .style("padding", '12px')
    .offset([-8, 0])
    .html(function(d) {
      return (`<b>${d.Country}</b><br>Consumption: ${d.Total} liters/year <br>GDP: ${d.GDP} (US$MM)<br>Legal Drinking Age: ${d.Age}`);
  });

//Create tooltip in the chart
cTip.call(toolTip);

//Create event listeners to display and hide the tooltip
cTip.on("mouseover", function(d) {
  d3.select(this).style("stroke", "black")
  toolTip.show(d, this);
})
  //on mouseout event
  .on("mouseout", function(d, index) {
    d3.select(this).style("stroke", "purple")
    .attr("r", "5")
    toolTip.show(d);
  });


  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
 


// Create Y-axis and X-axis labels
svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("GDP");

svg.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top+10})`)
.attr("class", "axisText")
.text("Total Average Alcohol Consumption (liter)");

});