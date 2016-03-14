// Code largely taken from https://bl.ocks.org/mbostock/3231298

var calculateRadiusForArea = function(area) {
  return Math.sqrt(area / Math.PI);
};

// Magic numbers
var width = 960,
    height = 500;

// A built-in d3 function that returns different hexadecimal colors
var color = d3.scale.category10();

// Create nodes of varying radius lengths
var nodes = [0].concat(totalCosts).map(function(tuple) {
  return { radius: calculateRadiusForArea(tuple[1]) };
});

// Set the first node to be the root, with a radius of 0
var root = nodes[0];
root.radius = 0;
root.fixed = true;

// Create svg element
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Render all nodes, besides the root
svg.selectAll("circle")
   .data(nodes.slice(1))
   .enter().append("circle")
   .attr("r", function(d) { return d.radius; })
   .style("fill", function(d, i) { return color(i % 10); });

// Initialize a gravitational force on all nodes, including root
// All nodes will have a charge of -2000 except the root, which has no charge
var force = d3.layout.force()
    .gravity(0.05)
    .charge(function(d, i) { return i ? 0 : -2000; })
    .nodes(nodes)
    .size([width, height]);
force.start();

// At every tick (frame), update node positions
force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes), // root node of new quadtree for all nodes
    // note this is different from our root at nodes[0]
      i = 0,
      n = nodes.length;

  // Call collides-with-node-i on each node in the quadtree, besides the root
  // Essentially checks collisions between every pair of nodes, besides the root
  // When nodes are determined to have collided, they will not be allowed to overlap
  while (++i < n) q.visit(collide(nodes[i]));

  svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});

// On mouse move, set the root's px and py to be the current mouse location
svg.on("mousemove", function() {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
});

// Returns function that checks if some node quad, with top-left corner (x1, y1) and bottom-right corner (x2, y2), collides with given node node
function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}