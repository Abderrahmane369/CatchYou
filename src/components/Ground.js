import { GameObjects } from "phaser";

export default class Ground extends GameObjects.Rectangle {
    constructor(scene, x, y, width, height, color) {
        super(scene, x, y, width, height, color);

    }

    init() {}
}
