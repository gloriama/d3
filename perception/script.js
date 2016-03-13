var sumNumbers = function(arr) {
  return arr.reduce(function(acc, item) {
    return acc + (typeof item === 'number' ? item : 0);
  }, 0);
};

var closenessBy = {
  alphabetical: closeness,
  closeness: closeness.slice(),
  earliestWorkedWith: closeness.slice(),
  longestWorkedWith: closeness.slice()
};

closenessBy.closeness.sort(function(a, b) {
  return sumNumbers(a) - sumNumbers(b);
});

closenessBy.earliestWorkedWith.sort(function(a, b) {
  var resultA = orderWorkedWith.indexOf(a[0]);
  var resultB = orderWorkedWith.indexOf(b[0]);
  if (resultA !== -1 && resultB === -1) {
    return -1;
  } else if (resultA === -1 && resultB !== -1) {
    return 1;
  } else {
    return resultA - resultB;
  }
});

closenessBy.longestWorkedWith.sort(function(a, b) {
  return daysWorkedWith(b[0]) - daysWorkedWith(a[0]);
});

var numToColor = function(d) {
  switch(d) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'red';
  }
};

var updateOrdering = function(ordering) {
  var people = d3.select('body').selectAll('div.person-div')
    .data(closenessBy[ordering]);

  people[0].forEach(function(person) {
    d3.select(person).selectAll('div.name-div')
      .text(person.__data__[0]);
    d3.select(person).selectAll('div.datum-div')
      .data(person.__data__.slice(1))
      .style('background', numToColor);
  });
};

// Run automatically
var people = d3.select('body').selectAll('div')
  .data(closenessBy['alphabetical'])
  .enter()
  .append('div')
  .attr('class', 'person-div');

people[0].forEach(function(person) {
  d3.select(person).selectAll('div.name-div')
    .data([person.__data__[0]])
    .enter()
    .append('div')
    .attr('class', 'name-div')
    .text(person.__data__[0]);

  d3.select(person).selectAll('div.datum-div')
    .data(person.__data__.slice(1))
    .enter()
    .append('div')
    .attr('class', 'datum-div')
    .style('background', numToColor);
});