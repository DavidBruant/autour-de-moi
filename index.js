"use strict";

// Assuming Node.js or Browser environment with browserify:
var gremlin = require('gremlin-client');

// Will open a WebSocket to ws://localhost:8182 by default
var client = gremlin.createClient();

//client.execute('g.addVertex(T.label, "software", "name", "gremlin");', function(err, results) {
client.execute('g.V()', function(err, results) {
    if (err) {
        console.error('err', err);
    }
    else{
        console.log(results) // Handle an array of results
    }
    client.ws.close();
});