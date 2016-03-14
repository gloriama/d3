var calculateRadiusForArea = function(area) {
  return Math.sqrt(area / Math.PI);
};

var svg = d3.select('body').append('svg')
  .attr('width', 500)
  .attr('height', 400);

svg.selectAll('circle')
  .data(totalCosts)
  .enter()
  .append('circle')
  .attr({
    r: function(d) { 
      return calculateRadiusForArea(d[1]);
    },
    cx: function() {
      return Math.random() * 500;
    },
    cy: function() {
      return Math.random() * 400;
    }
  })
  .style({
    fill: function() {
      return 'red';
    }
  })
  // this text does not work
  .text(function(d) {
    return d[0];
  });