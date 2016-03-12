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

var people = d3.select('body').selectAll('div')
  .data(closeness.slice(1))
  .enter()
  .append('div');

people[0].forEach(function(person) {
  d3.select(person).selectAll('div')
  .data(person.__data__.slice(1))
  .enter()
  .append('div')
  .attr('class', 'inline-div')
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
});