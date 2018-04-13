import {SVG_NS, PADDLEHEIGHT, PADDLEWIDTH} from '../settings.js';

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
      this.radius = radius;
      this.direction = 1;
      this.boardHeight = boardHeight;
      this.boardWidth = boardWidth;
      this.ping = new Audio("public/sounds/pong-01.wav");
      this.reset();
    }
    reset(){
      this.x = this.boardWidth / 2;
      this.y = this.boardHeight / 2;

      this.vy = 0;

      while( this.vy === 0){
        this.vy = Math.floor(Math.random() * 10 - 5);
      }

      this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    wallCollision(paddle, paddle2){
      const hitBottom = this.y + this.radius >= this.boardHeight;
      const hitTop = this.y - this.radius <=  0 ;
      const hitLeft = this.x - this.radius <= 0 ;
      const hitRight = this.x + this.radius >= this.boardWidth;

      if (hitTop || hitBottom){
        this.vy = this.vy * -1;
      } else if(hitLeft) {
        paddle2.incrementScore();
        this.reset();
        this.direction = -this.direction;
      }
      else if (hitRight) {
        paddle.incrementScore();
        this.direction = -this.direction;
        this.reset(); 
      }
    }

    paddleCollision(paddle, paddle2) {
      if (this.vx > 0){
            // check for player 2
        let [leftX, rightX, topY, bottomY] = paddle2.coordinates();
        
        if((this.x + this.radius >= leftX) &&
            (this.x + this.radius <= rightX) &&
            (this.y >= topY && this.y <= bottomY)){
              this.vx = this.vx * -1;
              this.ping.play();
            }
        }else {
            // check for player 1
            let [leftX, rightX, topY, bottomY] = paddle.coordinates();

        if((this.x - this.radius <= rightX) &&
            (this.x - this.radius >= leftX) &&
            (this.y >= topY && this.y <= bottomY)){
              this.vx = this.vx * -1;
              this.ping.play();
            }
      }
    }

    render(svg, paddle, paddle2) {

      this.x += this.vx;
      this.y += this.vy;

      this.wallCollision(paddle, paddle2);
      this.paddleCollision(paddle, paddle2);

      let Ball = document.createElementNS(SVG_NS, 'circle');
      Ball.setAttributeNS(null, 'r', this.radius);
      Ball.setAttributeNS(null, 'cx', this.x);
      Ball.setAttributeNS(null, 'cy', this.y);
      Ball.setAttributeNS(null, 'fill', 'blue');

      svg.appendChild(Ball);
  }
}