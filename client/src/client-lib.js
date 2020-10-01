const Phaser = require('phaser');
const Colyseus = require('colyseus.js');
const clone = require('clone');

const gameConfig = require('../../config.json');
let game;

const keyCodes = Phaser.Input.Keyboard.KeyCodes;
const keys = {
    w: keyCodes.W,
    s: keyCodes.S,
    a: keyCodes.A,
    d: keyCodes.D,
    up: keyCodes.UP,
    down: keyCodes.DOWN,
    left: keyCodes.LEFT,
    right: keyCodes.RIGHT,
    shift: keyCodes.SHIFT
};

module.exports = {
    createGame(newGame) {
        game = newGame;
    },

    loadImage(name, path) {
        game.load.image(name, path);
    },

    getImports() {

        const endpoint = (window.location.hostname === "localhost")
            ? `ws://localhost:${gameConfig.serverDevPort}` // development (local)
            : `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}` // production (remote)
        return { Phaser, Colyseus, clone, endpoint };
    },
    addKeys() {
        game.cursors = game.input.keyboard.addKeys(keys);
    },

    createSquare(width, height, x, y, color) {
        var rect = new Phaser.Geom.Rectangle(width, height, x, y);
        var graphics = game.add.graphics({ fillStyle: { color: `0x${color}` } });
        graphics.fillRectShape(rect);
    },
    createSprite(type, x, y) {
        let sprite = game.add.sprite(x, y, type);
        return sprite;
    },
    randomSprite(type, minX, maxX, minY, maxY) {
        let newX = Math.random() * (maxX - minX) + minX;
        let newY = Math.random() * (maxY - minY) + minY;
        let sprite = game.add.sprite(newX, newY, type);
        return sprite;
    },
    listenFor(type, cb) {
        game.room.listen(`${type}/:id`, function(change) {
            if (change.operation == 'add') {
                cb('add', change.value, game.room.sessionId);
            } else {
                cb('remove');
            }
        });
        game.room.listen(`${type}/:id/:attribute`, function(change) {
            game[type][change.path.id][change.path.attribute] = change.value
        })
    },
    cameraFollow(sprite) {
        game.cameras.main.startFollow(sprite);
    },
    sendMessage(type) {
        game.room.send({[type]: true});
    }
}
