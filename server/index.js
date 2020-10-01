const colyseus = require('colyseus');
const http = require('http');

const config = require("./../config.json");

const express = require('express');
const app = express();
const port = process.env.PORT || config.serverDevPort;
const path = require('path');

const server = http.createServer(app);
const gameServer = new colyseus.Server({server: server});

gameServer.register('main', require('./rooms/room.js'));
server.listen(port);

app.get('/',function(req,res){ 
    res.sendFile(path.join(__dirname+'./../client/public2/index.html')); 
    //__dirname : It will resolve to your project folder. 
});

app.use(express.static(__dirname + "/../client/public", {
    extensions: "html"
}));
console.log(`Listening on ws://localhost:${ port }`);

var production = process.env.NODE_ENV == "production";

if (production) {

}
else {
    const livereload = require('livereload');

    const reloadServer = livereload.createServer({
        exts: [ 'js', 'html', 'css', 'png', 'json' ],
        debug: true
    });

    reloadServer.watch([__dirname + "/../client/public"]);
}
