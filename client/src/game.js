const client = require('./client-lib');
const {Phaser, Colyseus, endpoint} = client.getImports();
const colyseus = new Colyseus.Client(endpoint);

module.exports = class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {

  }

  preload() {

  }

  create() {

  }

  update() {

  }

  connect() {
    
  }

}