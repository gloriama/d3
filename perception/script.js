// Bind data to DOM elements
d3.selectAll('div')
  .data(data)
  .enter()
  .append('div')
  .style('height', function(d) {
    var sumNumbers = d.reduce(function(acc, item) {
      if (typeof item !== 'number') {
        return acc;
      }
      return acc + item;
    }, 0);
    return sumNumbers + 'px';
  });