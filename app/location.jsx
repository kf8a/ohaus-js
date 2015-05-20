'use strict';

import React from "react";

var Location = React.createClass({
  renderForm: function() {
    return(
      <div className="location">
      <form className="form" onSubmit={this.props.handleRecord}>
          <label htmlFor="location">Location</label>
          <input id='location' placeholder="Sample Location" type='text' value={this.props.value} onChange={this.props.handleChange}/>
          <input type="submit" value="Record" />
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
