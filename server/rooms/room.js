
const Room = require('colyseus').Room;

module.exports = class MyRoom extends Room {

    onInit () {
        this.setState({

        });
    };

    onJoin (client, options) {
      this.state.players[client.sessionId] = {
        x: 50,
        y: 50,
        angle:0,
        id: client.sessionId
      }

      
    };

    onMessage (client, data) {
      let player = this.state.players[client.sessionId];

    };
    
    onLeave (client) {
        delete this.state.players[ client.sessionId ];
    };

};
