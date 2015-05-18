'use strict';

import React from "react";
import Chart from './chart.jsx';
import Location from './location.jsx'

var App = React.createClass({
  getInitialState: function() {
    return { 
      weight: [],
      recording: false,
      now: new Date()
    };
  },

  componentDidMount: function() {
    this.requestData();
  },

  render: function() {
    return (
      <div className="flux">
      <div className="row">
      <Chart 
      now={ this.state.now}
      recording={this.state.recording}
      data={this.state.weight} />
      </div>
      <div className="row">
      <Location />
      </div>
      </div>
    );
  },

  resetData: function() {
    this.setState({weight:[]});
  },

  handleCancel: function(e) {
    e.preventDefault();
    this.resetData();
    this.setState({ recording: false});
  },

  handleSave: function(e) {
    e.preventDefault();
    // send data back to server
    jQuery.ajax({
      type: "POST",
      url: "/save",
      data: JSON.stringify({"weight": this.state.weight}),
      dataType: 'json'
    });

    this.resetData();
    this.setState({ recording: false})
  },

  handleRecord: function(e) {
    e.preventDefault();
    this.resetData();
    this.setState({recording: true,
                  now: new Date()})
  },

  prepareData: function(datum) {
    this.state.weight.push({time: datum.time, value: datum.weight})

    if (this.state.weight.length > 200) {
      this.state.weight.shift();
    };

    this.setState({ weight: this.state.weight});
  },


  requestData: function() {
    var socket = this.props.socketService;

    socket.onDataReceived(function (datum) {
      datum.obs_time = new Date(datum.obs_time);
      datum.time = new Date(datum.time);

      this.prepareData(datum);
      if (this.state.recording) {
      }
    }.bind(this));
  }

});
module.exports = App;
