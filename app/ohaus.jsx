'use strict';

import React from "react";
import jQuery from "jquery";
import Chart from './chart.jsx';
import Location from './location.jsx'
import File from "./FileSaver.js"

var App = React.createClass({
  getInitialState: function() {
    return { 
      weight: [],
      recording: false,
      location: '',
      port: 8081,
      now: new Date(),
      isSubmitting: true
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
          handleStop={this.handleStop}
          handleChange={this.handleChange}
          value={this.state.location}
          isSubmitting={this.state.isSubmitting}
          recording={this.state.recording} />
        </div>
      </div>
    );
  },

  resetData: function() {
    this.setState({weight:[]});
  },

  handleChange: function(event) {
    if (event.target.value.length > 3) {
      this.setState( {isSubmitting: false})
    }
    this.setState({location: event.target.value});
  },

  handleStop: function(e) {
    e.preventDefault();
    this.setState({ recording: false,
                  location: null,
                  isSubmitting: true});
    // send data back to server
    jQuery.ajax({
      type: "POST",
      url: "http://localhost:"+ this.state.port+"/stop",
      // url: "/stop",
      data: JSON.stringify({"weight": this.state.weight}),
      dataType: 'json'
    });

    var blob = new Blob(this.to_csv(this.state.weight), {type: "text/text"});

    File.saveAs(blob, "download.csv");
    this.resetData();
  },

  to_csv: function(data) {
    var output = ["time, kg\n"]
    data.forEach(function(d) {
      output.push(d.time + ","+ d.value + "\n");
    });
    return output;
  },

  handleRecord: function(e) {
    e.preventDefault();
    this.setState({isSubmitting: true})
    this.resetData();
    jQuery.ajax({
      type: "POST",
      data: JSON.stringify({"location": this.state.location}),
      url: "http://localhost:" + this.state.port + "/record"
      // url: "/record"
    })
    this.setState({recording: true,
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
