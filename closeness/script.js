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

// var orderBy = function(infoObj, key, )

var comparators = {
  alphabetical: null, //default - will sort strings alphabetically
  closeness: function(a, b) {
    return sumNumbers(closeness[a]) - sumNumbers(closeness[b]);
  },
  queers: function(a, b) {
    return queers[a] ? -1 : 1;
  },
  tapout: function(a, b) {
    return tapout[a] ? -1 : 1;
  },
  women: function(a, b) {
    return women[a] ? -1 : 1;
  },
  age: function(a, b) {
    return age[a] - age[b];
  },
  race: function(a, b) {
    return race[a] - race[b];
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

var memoizedOrderings = {
  alphabetical: personNames.sort(comparators['alphabetical']).slice()
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
  if (!memoizedOrderings[ordering]) {
    personNames.sort(comparators[ordering]);
    memoizedOrderings[ordering] = personNames.slice();
  }

  personDivs
    .data(memoizedOrderings[ordering]);

  personDivs.select('.name-div')
    .text(function(d) {
      return d;
    });

  datumDivs
    .data(function(d) {
      return closeness[d];
    })
    .transition().duration(500)
    .style('background', getNumToColor);
};

// Create divs and render initially (sorted alphabetically by default)
var personDivs = d3.select('body').selectAll('div')
  .data(memoizedOrderings.alphabetical)
  .enter()
  .append('div')
  .attr('class', 'person-div');

var nameDivs = personDivs.append('div')
  .attr('class', 'name-div')
  .text(function(d) {
    return d;
  });

var datumDivs = personDivs.selectAll('.datum-div')
  .data(function(d) {
    return closeness[d];
  })
  .enter()
  .append('div')
  .attr('class', 'datum-div')
  .style('background', getNumToColor);