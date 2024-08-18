import { GameObjects, Physics } from "phaser";

export default class Player extends Physics.Matter.Sprite {
    textureKey;
    name = "player";
    width = 38;
    height = 46;
    _speed = 12;
    state = ["idle", "run", "jump", "fall"];
    jumpHeight = 55;
    isOnGround = false;
    isCatcher = false;
    cursors;
    controller = {
        MOVE_LEFT: null,
        MOVE_RIGHT: null,
        JUMP: null,
    };

    constructor(scene, x, y, color) {
        super(scene.matter.world, x, y);
        this.scene.add.existing(this);

        this.color = color;

        this.init();
    }

    init() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.textureKey = `playerTexure_${this.color.toString(16)}`;

        this.scene.add
            .graphics()

            .fillStyle(this.color, 1)
            .fillRect(0, 0, this.width, this.height)

            .lineStyle(4, 0x00, 0.251)
            .lineBetween(0, 0, this.width, 0) // Top line
            .lineBetween(this.width, 0, this.width, this.height) // Right line
            .lineStyle(4, 0x00, 0.051)
            .lineBetween(this.width, this.height, 0, this.height) // Bottom line
            .lineStyle(4, 0x00, 0.251)
            .lineBetween(0, this.height, 0, 0) // Left line

            .generateTexture(this.textureKey, this.width, this.height)
            .destroy();

        this.setTexture(this.textureKey);

        this.setBody({
            type: "rectangle",
            width: this.width,
            height: this.height,
        });

        this.setFixedRotation();

        this.setOnCollide((data) => {
            if (data.bodyA.isStatic || data.bodyB.isStatic) {
                this.isOnGround = true;
            }
        });

        this.setOnCollideEnd((data) => {
            if (data.bodyA.isStatic || data.bodyB.isStatic) {
                this.isOnGround = false;
            }
        });
    }

    update() {
        let velocityX = this.body.velocity.x;
        let velocityY = this.body.velocity.y;

        if (this.controller.MOVE_LEFT.isDown) {
            velocityX = -this.speed;
        } else if (this.controller.MOVE_RIGHT.isDown) {
            velocityX = this.speed;
        }

        if (this.controller.JUMP.isDown) {
            if (this.isOnGround) {
                velocityY = -this.jumpHeight;
            }
            this.speed  = 5;
        } else {
            this.speed = 12;
        }

        this.setVelocity(velocityX, velocityY);

        this.speed = this.isCatcher ? 20 : 15;

    }

    setController(controller) {
        this.controller = controller;

        return this;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }
}
