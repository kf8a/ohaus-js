'use strict';

import React from "react";

var Location = React.createClass({

  renderForm: function() {
    return(
      <div className="location">
      <form className="form" onSubmit={this.props.handleRecord}>
          <label htmlFor="location">Location</label>
          <input id='location' placeholder="Sample Location" type='text' value={this.props.value} onChange={this.props.handleChange}/>
          <input type="submit" value="Record" disabled={this.props.isSubmitting} />
      </form>
      </div>
    )
  },

  renderStopButton: function() {
    return(
      <div className="location">
      <form className="form" onSubmit={this.props.handleStop}>
        <p>Location: {this.props.value} </p>
        <input type="submit" value="Stop" />
        </form>
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
