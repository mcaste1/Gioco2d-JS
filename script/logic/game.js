import Player from "../models/player.js";
import Sound from "../models/sound.js";
import Sprite from "../models/sprite.js";
import Hitbox from "../models/hitbox.js";

class Game {
    playerNickname;

    constructor(canvas, config, playerNickname) {
        this.config = config
        this.canvas = canvas;
        this.playerNickname = playerNickname;
        this.ctx = canvas.getContext('2d');
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.width = this.config.BG_WIDTH;
        this.canvas.height = this.config.BG_HEIGHT;
        this.canvas.style.backgroundImage = "url('" + this.config.BACKGROUND_IMG_SRC + "')";
        this.canvas.style.backgroundSize = "contain";

        this.ground = new Hitbox(0,40, this.canvas.width, 150);
        this.player = new Player(this.config.PLAYER_SRC, this.playerNickname);
        this.player2 = new Player(this.config.PLAYER_SRC, this.playerNickname);
        this.fireball = new Sprite(this.config.FIREBALL_SRC, 360, 360, 6, 1, 50, 50);
        this.obstacle = new Hitbox(550, 200, 100, 200);
        this.bgMusic = new Sound("assets/audio/background.mp3");
    }

    keyboardPressedHandler(key) {
        switch(key) {
            case "d":
                this.player.velocity.x = this.config.WALK_SPEED;
                break;
            case "a":
                this.player.velocity.x = -this.config.WALK_SPEED;
                break;
            case " ":
                this.player.jump(); 
                break;
            case "w":
                this.player.addSpeed(0, 3);
                break;
            case "g":
                this.player.shoot(this.ctx);
                break;
        }
    }

    keyboardReleasedHandler(key) {
        switch(key) {
            case "d":
            case "a":
                this.player.velocity.x = 0;
                break;
            case "w":
                this.player.setSpeed(0, 0);
                break;
        }
    }

    update() {
        if(this.player.collision(this.ground)){
            if(this.player.velocity.y < 0){
                this.player.velocity.y = 0;
                this.player.canJump = true;
                this.player.position.y = this.ground.position.y + this.player.height;
                // console.log("Player pos: ", this.player.position);
                // console.log("Ground: ", this.ground.position);
            }
            
        }
        if(this.player.collision(this.obstacle) || this.obstacle.collision(this.player)) {
            if(this.player.position.y > this.obstacle.y + this.player.height){
                this.player.velocity.y = 0;
            }
            /*
            if(this.player.velocity.x > 0){
                this.player.velocity.x = 0;
            }
            */
            //this.player.position.x = this.obstacle.position.x - this.player.width;
            console.log("PLAYER CONTRO IL MURO");
        };
        this.player.update();
        this.fireball.update();
        this.player2.update();
    }

    playBgMusic() {
        this.bgMusic.play();
    }

    stopBgMusic() {
        this.bgMusic.stop();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //this.ctx.clearRect(player.position);
        this.player.draw(this.ctx);
        this.fireball.draw(this.ctx);
        this.ground.draw(this.ctx);
        this.obstacle.draw(this.ctx);
        this.player2.draw(this.ctx);
    }

}

export default Game;