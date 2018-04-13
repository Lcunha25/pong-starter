import {SVG_NS, KEYS, PADDLEHEIGHT, PADDLEWIDTH, BOARDGAP, RADIUS} from '../settings.js';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball'
import Score from './Score.js';

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
		this.score1 = new Score(300, 50, 30);
		this.score2 = new Score(200, 50, 30);

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.pause){
				this.pause = !this.pause;
			}
		});
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
		this.paddle.render(svg);
		this.paddle2.render(svg);
		this.Ball.render(svg, this.paddle, this.paddle2);
		this.score1.render(svg, this.paddle.getScore());
		this.score2.render(svg, this.paddle2.getScore());
	}
}