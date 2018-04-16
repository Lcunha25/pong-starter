import {SVG_NS, KEYS, PADDLEHEIGHT, PADDLEWIDTH, BOARDGAP, RADIUS} from '../settings.js';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball'
import Score from './Score.js';
import Keypush from './Keypush.js';
import DoYouKnowTheWay from './DoYouKnowTheWay.js'

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.paddleWidth = PADDLEWIDTH;
		this.paddleHeight = PADDLEHEIGHT;
		this.boardGap = BOARDGAP;
		this.radius = RADIUS;
		this.pause = false;
		this.ping = new Audio('public/sounds/pong-05.wav');

	
		this.gameElement = document.getElementById(this.element);
		this.Board = new Board(this.width, this.height);

		this.paddle = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight, 
			this.boardGap, 
			((this.height - this.paddleHeight)/ 2),
			KEYS.p1up,
			KEYS.p1down
	);
		this.paddle2 =  new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight, 
			(this.width - this.boardGap - this.paddleWidth), 
			((this.height - this.paddleHeight)/ 2),
			KEYS.p2up,
			KEYS.p2down
	);
		this.Ball = new Ball(
			RADIUS,
			this.width,
			this.height
		)
		this.Ball2 = new Ball(
			this.radius = 5,
			this.width,
			this.height
		)
		this.Ball3 = new Ball(
			this.radius = 12,
			this.width,
			this.height
		)
		this.score1 = new Score(300, 50, 30);
		this.score2 = new Score(200, 50, 30);
		this.keypush = new Keypush();
		document.addEventListener('keydown', event => {
			if (event.key === KEYS.pause){
				this.pause = !this.pause;
			}
		});
		this.IMG = new DoYouKnowTheWay(		
		);
	}

	render() {
		if (this.pause){
			return;
		}
		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		
		this.gameElement.appendChild(svg);

		this.Board.render(svg);
		this.paddle.render(svg, this.keypush);
		if (this.paddle2.getScore() > 5) {
			this.paddle.height = 26;
		}
		this.paddle2.render(svg, this.keypush);
		if (this.paddle.getScore() > 5) {
			this.paddle2.height = 26;
		}
		this.Ball.render(svg, this.paddle, this.paddle2);
		if (this.paddle.getScore() > 2 || this.paddle2.getScore() > 2) {
			this.Ball2.render(svg, this.paddle, this.paddle2);
		}
		if (this.paddle.getScore() > 4 || this.paddle2.getScore() > 4) {
			this.Ball3.render(svg, this.paddle, this.paddle2);
		}
		if (this.paddle.getScore() > 8 || this.paddle2.getScore() > 8) {
			this.IMG.render();
			this.ping.play();
			this.pause = true;
			setTimeout(() => {
				this.paddle.resetScore();
				this.paddle2.resetScore();
				this.paddle.height = 56;
				this.paddle2.height = 56;
				this.paddle.y = ((this.height - this.paddleHeight)/ 2);
				this.paddle2.y = ((this.height - this.paddleHeight)/ 2);
			}, 1500);
		}
		this.score1.render(svg, this.paddle.getScore());
		this.score2.render(svg, this.paddle2.getScore());
	}
}