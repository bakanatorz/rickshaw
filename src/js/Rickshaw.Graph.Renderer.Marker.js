Rickshaw.namespace('Rickshaw.Graph.Renderer.Marker');

Rickshaw.Graph.Renderer.Marker = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'marker',

	defaults: function($super) {

		return Rickshaw.extend( $super(), {
			unstack: true,
			fill: true,
			stroke: false,
			padding:{ top: 0.01, right: 0.01, bottom: 0.01, left: 0.01 },
            strokeDashArray: "1, 0",
			strokeWidth: 2
		} );
	},

	initialize: function($super, args) {
		$super(args);
	},

	render: function(args) {

		args = args || {};

		var graph = this.graph;

		var series = args.series || graph.series;
		var vis = args.vis || graph.vis;

		var strokeWidth = this.strokeWidth;
		var strokeDashArray = this.strokeDashArray;

		vis.selectAll('*').remove();

		series.forEach( function(series) {

			if (series.disabled) return;

			var nodes = vis.selectAll("path")
				.data(series.stack.filter( function(d) { return d.y !== null } ))
				.enter().append("svg:line")
					.attr("x1", function(d) { return graph.x(d.x) })
					.attr("y1", 0)
					.attr("x2", function(d) { return graph.x(d.x) })
					.attr("y2", graph.height)
                    .style("stroke", series.color)
                    .style("stroke-width", function(d) {return ("strokeWidth" in d) ? d.strokeWidth : strokeWidth})
                    .style("stroke-dasharray", function(d) {return ("strokeDashArray" in d) ? d.strokeDashArray : strokeDashArray});
			if (series.className) {
				nodes.classed(series.className, true);
			}
			
		}, this );
	}
} );
