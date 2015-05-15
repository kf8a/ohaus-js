'use strict';

import React from "react";
import Hello from "./component.js";
import SocketService from "./socket-service.js"
import App from "./ohaus.jsx"

main();

function main() {
  var socketService = new SocketService({
    path: '/ws',
    port: "8081"
  });

  React.render(
    < App socketService={socketService} />, 
      document.getElementById('app')
  )
}
