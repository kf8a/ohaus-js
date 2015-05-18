'use strict';

import React from "react";

var Location = React.createClass({
  renderForm: function() {
    return(
      <div className="location">
      <form className="form">
          <label htmlFor="location">Location</label>
          <input type='text' value={this.props.value} onChange={this.props.handleChange}/>
        <button type='button' className="btn btn-primary btn-lg" onClick={this.props.handleRecord}>Record</button>
      </form>
      </div>
    )
  },

  renderStopButton: function() {
    return(
      <div className="location">
        <p> {this.props.value} </p>
        <button type='button' className="btn btn-primary btn-lg" onClick={this.props.handleSave}>Save</button>
        <button type='button' className="btn btn-lg" onClick={this.props.handleCancel}>Cancel</button>
      </div>
    )
  },

  render: function() {
    if (this.props.recording){
      return this.renderStopButton();
    } else {
      return this.renderForm();
    }
  },
})

module.exports = Location;
