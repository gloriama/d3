// Bind data to DOM elements
// var people = d3.selectAll('div')
//   .data(data)
//   .enter()
//   .append('div')
//   .style('height', function(d) {
//     var sumNumbers = d.reduce(function(acc, item) {
//       if (typeof item !== 'number') {
//         return acc;
//       }
//       return acc + item;
//     }, 0);
//     return sumNumbers + 'px';
//   });

// For each row in data, create a div
// For each item in row, create a span

d3.select('body').selectAll('div')
  .data(data[1].slice(1))
  .enter()
  .append('div')
  .style({
    width: function(d) {
      return '2em';
    },
    background: function(d) {
      switch(d) {
        case 0:
          return 'green';
          break;
        case 1:
          return 'yellow';
          break;
        case 2:
          return 'red';
          break;
      }
    }
  });