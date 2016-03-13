// ---- CRUNCH DATA ----

var personNames = Object.keys(closeness);
var partnerInfo = partners.reduce(function(acc, personNameOrNames, i) {
  var info = {
    length: sprintLengths[i],
    firstDay: acc._counter
  };
  if (typeof personNameOrNames === 'string') {
    acc[personNameOrNames] = info;
  } else {
    personNameOrNames.forEach(function(personName) {
      acc[personName] = info;
    });
  }
  acc._counter += sprintLengths[i];
  return acc;
}, { _counter: 1 });
delete partnerInfo._counter;


// ---- SET UP COMPARATORS ----

var sumNumbers = function(arr) {
  return arr.reduce(function(acc, item) {
    return acc + item;
  }, 0);
};

var comparators = {
  alphabetical: null, //default - will sort strings alphabetically
  closeness: function(a, b) {
    return sumNumbers(closeness[a]) - sumNumbers(closeness[b]);
  },
  earliestWorkedWith: function(a, b) {
    if (!partnerInfo[b]) {
      return -1;
    } else if (!partnerInfo[a]) {
      return 1;
    } else {
      return partnerInfo[a].firstDay - partnerInfo[b].firstDay;
    }
  },
  longestWorkedWith: function(a, b) {
    if (!partnerInfo[b]) {
      return -1;
    } else if (!partnerInfo[a]) {
      return 1;
    } else {
      return partnerInfo[b].length - partnerInfo[a].length;
    }
  }
};


// ---- RENDER USING D3 ----

var numToColor = {
  '0': '#48a245', //darker green
  '1': '#8ec56a', //medium green
  '2': '#d6e58a', //lighter green
  '3': '#ededed' //grey
};

var getNumToColor = function(d) {
  return numToColor[d];
};

var updateOrdering = function(ordering) {
  personNames.sort(comparators[ordering]);

  var personDivs = d3.select('body').selectAll('div.person-div')
    .data(personNames);

  personDivs[0].forEach(function(personDiv) {
    d3.select(personDiv).selectAll('div.name-div')
      .text(personDiv.__data__);
    d3.select(personDiv).selectAll('div.datum-div')
      .data(closeness[personDiv.__data__])
      .transition().duration(500)
      .style('background', getNumToColor);
  });
};

// Create divs and render initially (sorted alphabetically by default)
personNames.sort(comparators.alphabetical);
var personDivs = d3.select('body').selectAll('div')
  .data(personNames)
  .enter()
  .append('div')
  .attr('class', 'person-div');

personDivs[0].forEach(function(personDiv) {
  d3.select(personDiv).selectAll('div.name-div')
    .data(['dummy']) // dummy array, used for its length (1) to create one div
    .enter()
    .append('div')
    .attr('class', 'name-div')
    .text(personDiv.__data__);

  d3.select(personDiv).selectAll('div.datum-div')
    .data(closeness[personDiv.__data__])
    .enter()
    .append('div')
    .attr('class', 'datum-div')
    .style('background', getNumToColor);
});