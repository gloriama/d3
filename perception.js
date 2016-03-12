// Bind data to DOM elements
d3.selectAll('div')
  .data([5,30,90])
  .style('height', function(d) {
    return d + 'px';
  });
// Render in some way