'use strict';

import React from "react";

var Location = React.createClass({
  render: function() {
    return(
      <div className="location">
      <form className="form">
          <div className="form-group">
          <label for="location">Location</label>
          <input id="location" type='text'/>
        </div>
        <button type='button' className="btn btn-primary btn-lg" onClick={this.props.handleRecord}>Record</button>
      </form>
      </div>
    )
  }
})

module.exports = Location;
