import { GameObjects, Input, Math, NONE, Scene } from "phaser";
import Ground from "../components/Ground";
import Player from "../entities/Player";
import CurrentCatcherArrow from "../components/CurrentCatcherArrow";
import GroundManager from "../managers/GroundManager";

export class Main extends Scene {
    WIDTH;
    HEIGHT;
    WORLD_BOUNDS;

    // components
    groundManager;
    foreground;
    grounds;
    player;
    currentCatcherArrow;
    roundTimeleft;

    constructor() {
        super({ key: "Main" });
    }

    init() {
        this.WIDTH = this.scale.width;
        this.HEIGHT = this.scale.height;
        this.WORLD_BOUNDS = {
            x: 4 * -this.WIDTH,
            y: -this.HEIGHT * 4,
            width: this.WIDTH * 8,
            height: this.HEIGHT * 8,
        };

        this.roundTimeleft = {
            minutes: 2,
            seconds: 0,
        };

        const { x, y, width, height } = this.WORLD_BOUNDS;
        this.matter.world.setBounds(x, y, width, height, 5000);

        this.groundManager = new GroundManager(this);
    }

    preload() {
        this.load.setPath("assets");
    }

    create() {
        this.events.emit('test');

        Grounds: {
            this.groundManager.createGround({
                x: 0,
                y: 1000,
                width: 1000,
                height: 200,
                color: 0x2f3645,
            });

            this.groundManager.createGrounds(4, (i) => ({
                x: -this.WIDTH + 1200 * i,
                y: this.WORLD_BOUNDS.height / 5 - 50,
                width: 70,
                height: this.HEIGHT * 2.4,
                color: 0x2f3645,
            }));

            // this.foreground = new Ground(
            //     this,
            //     0,
            //     this.WORLD_BOUNDS.height / 2,
            //     this.WORLD_BOUNDS.width,
            //     100,
            //     0x2f3645
            // );

            // Array(4)
            //     .fill(0)
            //     .forEach((_, i) => {
            //         const ground = new Ground(
            //             this,
            //             -this.WIDTH + 1200 * i,
            //             this.WORLD_BOUNDS.height / 5 - 50,
            //             70,
            //             this.HEIGHT * 2.4,
            //             0x2f3645
            //         );
            //     });

            // Array(6)
            //     .fill(0)
            //     .forEach((_, i) => {
            //         const ground = new Ground(
            //             this,
            //             i * 1000 - this.WIDTH * 1.5,
            //             this.WORLD_BOUNDS.height / 2 - 500,
            //             500,
            //             200,
            //             0x2f3645
            //         );
            //     });

            // const inclined1 = new Ground(
            //         this,
            //         this.WORLD_BOUNDS.x + 600 * 3,
            //         this.WORLD_BOUNDS.height / 4 - 400,
            //         100,
            //         this.HEIGHT * 5,
            //         0x2f3645
            //     ).setAngle(40),
            //     inclined2 = new Ground(
            //         this,
            //         this.WORLD_BOUNDS.width + this.WORLD_BOUNDS.x - +600 * 3,
            //         this.WORLD_BOUNDS.height / 4 - 400,
            //         100,
            //         this.HEIGHT * 5,
            //         0x2f3645
            //     ).setAngle(-40);

            // this.grounds.add(inclined1);
            // this.grounds.add(inclined2);

            // this.add.existing(this.grounds);
        }

        // PLAYER 1
        this.player1 = new Player(this, 20, 20, 0x1034a6);
        this.player1.setController({
            MOVE_LEFT: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.LEFT),
            MOVE_RIGHT: this.input.keyboard.addKey(
                Input.Keyboard.KeyCodes.RIGHT
            ),
            JUMP: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.UP),
        });

        // PLAYER 2
        this.player2 = new Player(this, 160, 20, 0xe30022);
        this.player2.setController({
            MOVE_LEFT: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.Q),
            MOVE_RIGHT: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D),
            JUMP: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.Z),
        });

        this.currentCatcherArrow = new CurrentCatcherArrow(this, this.player1);

        this.matter.world.on(
            "collisionstart",
            (event) => {
                const { bodyA, bodyB } = event.pairs[0];

                const isPlayersInvolved =
                    (bodyA.gameObject === this.player1 &&
                        bodyB.gameObject === this.player2) ||
                    (bodyA.gameObject === this.player2 &&
                        bodyB.gameObject === this.player1);

                if (isPlayersInvolved) {
                    this.currentCatcherArrow.currentCatcher =
                        this.currentCatcherArrow.currentCatcher === this.player1
                            ? this.player2
                            : this.player1;
                }
            },
            this
        );

        MainCamera: {
            // CAMERA FIELD
            const mainCamera = this.cameras.main;
            const { x, y, width, height } = this.WORLD_BOUNDS;

            mainCamera.shake(1000, 0.01).fadeFrom(2000, 200, 100, 100, true);

            // mainCamera.ignore([this.player1ScoreText]);
        }

        // UICamera: {
        //     const UICamera = this.cameras
        //         .add(100, 0, 500, 300, false, "UICamera")
        //         .ignore([this.player1, this.player2, this.foreground]);
        // }

        // TODO SANDBOX
        // Create a circular path
        // this.path = new Phaser.Curves.Line(
        //     new Phaser.Math.Vector2(400, 300),
        //     new Phaser.Math.Vector2(700, 300)
        // );

        // // Create a sprite that will follow the path
        // this.follower = this.add.follower(
        //     this.path,
        //     400,
        //     300,
        //     "rectangle"
        // );

        // // Start following the path
        // this.follower.startFollow({
        //     duration: 1000, // Time in ms for one complete circle
        //     repeat: -1, // Repeat forever
        //     yoyo: true, // Do not reverse direction
        //     ease: "Sine.InOut", // Linear easing
        // });
    }

    update() {
        //*
        // Update the speed text

        //*

        this.player1.update();
        this.player2.update();
        this.currentCatcherArrow.update();
        this.player1.isCatcher =
            this.currentCatcherArrow.currentCatcher === this.player1;
        this.player2.isCatcher =
            this.currentCatcherArrow.currentCatcher === this.player2;

        Camera: {
            // CAMERA FIELD
            // Calculate the distance between player1 and player2
            const distance = Phaser.Math.Distance.Between(
                this.player1.x,
                this.player1.y,
                this.player2.x,
                this.player2.y
            );

            const midpoint = {
                x: (this.player1.x + this.player2.x) / 2,
                y: (this.player1.y + this.player2.y) / 2,
            };

            // Calculate the target zoom level based on the distance
            const targetZoom = Phaser.Math.Clamp(
                1 / (distance / 500),
                0.15,
                0.7
            );

            // Gradually adjust the current zoom level towards the target zoom level
            const currentZoom = this.cameras.main.zoom;
            const newZoom = Phaser.Math.Interpolation.Bezier(
                [currentZoom, targetZoom],
                0.05
            );

            // Center the camera on the midpoint and set the new zoom level
            // this.cameras.main.centerOn(0, 0).setZoom(0.3);
            this.cameras.main.centerOn(midpoint.x, midpoint.y).setZoom(newZoom);
        }
    }
}
