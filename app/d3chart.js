'use strict';

import d3 from 'd3';

var d3Chart = {};

d3Chart.elements = {};

d3Chart.create = function(el, state) {
  var boundingBox = d3.select(el).node().getBoundingClientRect();
  var height = boundingBox.height
  var width =  boundingBox.width
  var data  =  state.data
  var margin = {top: 20, right: 20, bottom: 20, left: 40}

  var svg = d3.select(el).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  var x = d3.time.scale()
      .domain([d3.min(data, function(d) {return d.time}), 
               d3.max(data, function(d) {return d.time})])
      .range([0, width]);
  this.elements.x = x;

  var y = d3.scale.linear()
    .domain([2.2, 4.5])
    .range([height, 0]);
  this.elements.y = y

  var xAxis = d3.svg.axis().scale(x).orient("top");
  this.elements.xAxis = xAxis;

  svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

  var yAxis = d3.svg.axis().scale(y).orient("left");
  this.elements.yAxis = yAxis;

  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

  svg.append("g")
    .attr("class", "circles")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 3.5)
    .attr("cx", x(function(d) {return(d.time)}))
    .attr("cy", y(function(d) {return(d.value)}))

  return(this);
};

d3Chart.update = function(el, state) {

  var data = state.data;
  if (data.length == 0) { return }

  var svg = d3.select(el).select('svg');

  // Re-compute the elements, and render the data points
  var x = this.elements.x;
  var y = this.elements.y;

  var xAxis = this.elements.xAxis;
  var yAxis = this.elements.yAxis;

  var min_x = d3.min(data, function(d) {return d.time});
  var max_x = d3.max(data, function(d) {return d.time});

  var min_y = d3.min(data, function(d) {return d.value});
  var max_y = d3.max(data, function(d) {return d.value});

  x.domain([min_x, max_x]);
  svg.select(".x.axis").call(xAxis);

  y.domain([min_y, max_y]);
  svg.select(".y.axis").call(yAxis);

  var circles = svg.select(".circles")
    .selectAll("circle")
    .data(data);

  circles
    .enter()
    .append("circle")
    // .attr("r", 2)
    // .attr("cx", function(d) { return x(d.time)})
    // .attr("cy", function(d) { return y(d.value)})

  circles
    .attr("r",2)
    .attr("cx", function(d) {return x(d.time)})
    .attr("cy", function(d) { return y(d.value)})

  circles
    .exit()
    .remove()

};

d3Chart.destroy = function(el) {
  // Any clean-up would go here
};

module.exports = d3Chart;
