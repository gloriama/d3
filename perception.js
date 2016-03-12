// Bind data to DOM elements
d3.selectAll('div')
  .data(['red', 'blue', 'yellow'])
  .style('background-color', function(d) {
    console.log(d);
    return d;
  });
