var sumNumbers = function(arr) {
  return arr.reduce(function(acc, item) {
    return acc + (typeof item === 'number' ? item : 0);
  }, 0);
};

var earliestWeekWorkedWith = function(personName) {
  for (var i = 0; i < partners.length; i++) {
    if (partners[i].indexOf(personName) !== -1) {
      return i+1;
    }
  }
  return -1;
};

var closenessBy = {
  alphabetical: closeness,
  closeness: closeness.slice(),
  earliestWorkedWith: closeness.slice(),
};

closenessBy.closeness.sort(function(a, b) {
  return sumNumbers(a) - sumNumbers(b);
});

closenessBy.earliestWorkedWith.sort(function(a, b) {
  var resultA = earliestWeekWorkedWith(a[0]);
  var resultB = earliestWeekWorkedWith(b[0]);
  if (resultA !== -1 && resultB === -1) {
    return -1;
  } else if (resultA === -1 && resultB !== -1) {
    return 1;
  } else {
    return resultA - resultB;
  }
});

console.log(closenessBy.earliestWorkedWith.map(function(a) { return a[0]; }));

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
  var people = d3.select('body').selectAll('div.parent-div')
    .data(closenessBy[ordering]);

  people[0].forEach(function(person) {
    d3.select(person).selectAll('div')
      .data(person.__data__.slice(1))
      .style('background', numToColor);
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
    .style('background', numToColor);
});