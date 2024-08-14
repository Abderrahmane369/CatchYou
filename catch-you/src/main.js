import { Game as MainGame } from "./scenes/Game";
import { AUTO, Scale, Game } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
    width: 111,
    height: 100,
    parent: "game-container",
    backgroundColor: "#028af8",
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 0.5 },
        },
    },
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    scene: [MainGame],
};

export default new Game(config);
