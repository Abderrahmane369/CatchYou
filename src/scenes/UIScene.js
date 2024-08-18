import { Scene } from "phaser";
import CountDownTimer from "../components/CountdownTimer";

export class UIScene extends Scene {
    WIDTH;
    HEIGHT;
    WIDTH_CENTER;
    HEIGHT_CENTER;

    // UI Components
    countdownTimer;

    constructor() {
        super({ key: "UIScene", active: true });
    }

    init() {
        this.WIDTH = this.scale.width;
        this.HEIGHT = this.scale.height;
        this.WIDTH_CENTER = this.WIDTH / 2;
        this.HEIGHT_CENTER = this.HEIGHT / 2;
        // Listen for the updateTimeLeft event
    }

    preload() {
        // fonts
        this.load.setPath("assets/fonts");
        this.load.font("font_RobotoMono", "RobotoMono-Bold.ttf");
    }

    create() {
        const MainScene = this.scene.get("Main");

        this.countDownTimer = new CountDownTimer(
            this,
            this.WIDTH_CENTER,
            40,
            MainScene.roundTimeleft
        ).start();

        // this.scene.get("Main").events.on("test", () => {
        //     console.log("test");
        // });
    }

    update() {}
}
