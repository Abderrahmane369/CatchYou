import { AUTO, Scale, Game } from "phaser";
import { UIScene } from "./scenes/UIScene";
import { Main } from "./scenes/Main";

// Plugins
import { FontLoaderPlugin } from "./plugins/font_loader_plugin";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game-container",
    backgroundColor: 0xbcbcbc,
    plugins: {
        global: [
            {
                key: "FontLoaderPlugin",
                plugin: FontLoaderPlugin,
                start: true,
            },
        ],
    },
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 4.8 },
            debug: true,
        },
    },

    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    scene: [Main, UIScene],
};

export default new Game(config);
