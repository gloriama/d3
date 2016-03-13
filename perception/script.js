var sumNumbers = function(arr) {
  return arr.reduce(function(acc, item) {
    return acc + (typeof item === 'number' ? item : 0);
  }, 0);
};

var closenessBy = {
  alphabetical: closeness,
  closeness: closeness.slice()
};
closenessBy.closeness.sort(function(a, b) {
  return sumNumbers(a) - sumNumbers(b);
});

var updateOrdering = function(ordering) {
  var people = d3.select('body').selectAll('div.parent-div')
    .data(closenessBy[ordering]);

  people[0].forEach(function(person) {
    d3.select(person).selectAll('div')
      .data(person.__data__.slice(1))
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
};

// Run automatically
var people = d3.select('body').selectAll('div')
  .data(closenessBy['alphabetical'])
  .enter()
  .append('div')
  .attr('class', 'parent-div');

people[0].forEach(function(person) {
  d3.select(person).selectAll('div')
    .data(person.__data__.slice(1))
    .enter()
    .append('div')
    .attr('class', 'child-div')
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