'use strict';

import React from "react";
import jQuery from "jquery";
import Chart from './chart.jsx';
import Location from './location.jsx'

var App = React.createClass({
  getInitialState: function() {
    return { 
      weight: [],
      recording: false,
      location: '',
      port: 8081,
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
        <Location
          handleRecord={this.handleRecord}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          handleChange={this.handleChange}
          value={this.state.location}
          recording={this.state.recording} />
        </div>
      </div>
    );
  },

  resetData: function() {
    this.setState({weight:[]});
  },

  handleChange: function(event) {
    this.setState({location: event.target.value});
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
      url: "http://localhost:"+ this.state.port+"/save",
      data: JSON.stringify({"weight": this.state.weight}),
      dataType: 'json'
    });

    this.resetData();
    this.setState({ recording: false})
  },

  handleRecord: function(e) {
    e.preventDefault();
    console.log(this.state.location)
    this.resetData();
    jQuery.ajax({
      type: "POST",
      data: JSON.stringify({"location": this.state.location}),
      url: "http://localhost:" + this.state.port + "/record"
    })
    this.setState({recording: true,
                  value: 'something',
                  now: new Date()})
  },

  prepareData: function(datum) {
    this.state.weight.push({time: datum.time, value: datum.weight})

    if (!this.state.recording && this.state.weight.length > 200) {
      this.state.weight.shift();
    };

    this.setState({ weight: this.state.weight});
  },


  requestData: function() {
    var socket = this.props.socketService;

    socket.onDataReceived(function (datum) {
      datum.time = new Date(datum.time);

      this.prepareData(datum);
      if (this.state.recording) {
      }
    }.bind(this));
  }

});
module.exports = App;
