var calculateRadiusForArea = function(area) {
  return Math.sqrt(area / Math.PI);
};

var categoryDivs = d3.select('body').selectAll('div')
  .data(totalCosts)
  .enter()
  .append('div');

categoryDivs[0].forEach(function(categoryDiv) {
  d3.select(categoryDiv).selectAll('div')
    .data(['dummy'])
    .enter()
    .append('div')
    .attr('class', 'inline-div')
    .style({
      width: function(d) {
        return calculateRadiusForArea(categoryDiv.__data__[1]) * 2 + 'px';
      },
      height: function(d) {
        return calculateRadiusForArea(categoryDiv.__data__[1]) * 2 + 'px';
      },
      'border-radius': function(d) {
        return calculateRadiusForArea(categoryDiv.__data__[1]) + 'px';
      }
    })
    .text(function(d) {
      return categoryDiv.__data__[0];
    });
})