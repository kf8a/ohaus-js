'use strict';

import React from "react";
import d3Chart from './d3Chart.js';

var Chart = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },

  componentDidMount: function() {
    var el = this.getDOMNode();

    this.d3Chart = d3Chart.create(el, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    this.d3Chart.update(el, this.getChartState());
  },

  getChartState: function() {
    var el = this.getDOMNode();
    return {
      data: this.props.data,
      now: this.props.now,
      recording: this.props.recording
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    this.d3Chart.destroy(el);
  },

  render: function() {
    return (
      <div className="Chart">
      </div>
    );
  }
});

module.exports = Chart;
