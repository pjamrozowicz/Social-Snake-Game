'use strict';

import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import _ from "underscore";
import Bacon from "baconjs";
import axios from "axios";

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(v) {
        return this.x === v.x && this.y === v.y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    mod(max) {
        return new Vector((this.x + max.x) % max.x, (this.y + max.y) % max.y);
    }

    static random(max) {
        return new Vector(Math.floor(Math.random() * max.x), Math.floor(Math.random() * max.y));
    }

    static rotateRight(vec) {
        return new Vector(-vec.y, vec.x);
    }

    static rotateLeft(vec) {
        return new Vector(vec.y, -vec.x);
    }
}

class App extends Component {

	render() {
		return (
		    <div className="main-game">
                <h1 className="title">Snake</h1>
                <SnakeGame boardSize={new Vector(20, 20)} />
            </div>
		)
	}
}

class SnakeGame extends Component {
    defaultProps = {
        initialSnakePosition: new Vector(0, 0),
        initialSnakeDirection: new Vector(0, 1),
        initialSnakeLength: 3
    };

    state = {
        snakePositions: [],
        fruitPosition: Vector.random(this.props.boardSize),
        score: 0
    };

    inputStreams() {
        const ticks = Bacon.interval(100);
        const keys = Bacon.fromEvent(document.body, "keyup").map(".keyCode");
        console.log("calling bacon!");
        const lefts = keys.filter(key => key === 37);
        const rights = keys.filter(key => key === 39);
        return { ticks, lefts, rights };
    }

    snakeHeadPositions({ ticks, lefts, rights }) {
        const leftRotations = lefts.map(() => Vector.rotateLeft);
        const rightRotations = rights.map(() => Vector.rotateRight);
        const actions = leftRotations.merge(rightRotations);

        const directions = actions.scan(this.defaultProps.initialSnakeDirection, (dir, f) => f(dir));
        return directions
            .sampledBy(ticks)
            .scan(this.defaultProps.initialSnakePosition, (pos, dir) => pos.add(dir).mod(this.props.boardSize));
    }

    componentDidMount() {
        const snakeHeadPositions = this.snakeHeadPositions(this.inputStreams());
        const snakes = snakeHeadPositions.scan([], (snake, head) => {
            const biggerSnake = _.union(snake, [head]);
            const validSnake = _.last(biggerSnake, this.defaultProps.initialSnakeLength + this.state.score);
            return validSnake;
        });
        snakes.onValue(snake => this.setState({ snakePositions: snake }));

        const fruitEatenEvents = snakeHeadPositions.filter(head =>
            head.equals(this.state.fruitPosition));
        fruitEatenEvents.onValue(() => this.setState({ score: this.state.score + 1 }));
        fruitEatenEvents
            .map(() => Vector.random(this.props.boardSize))
            .onValue(fruit => this.setState({ fruitPosition: fruit }));

        const gameOverEvents = snakeHeadPositions.filter(head =>
            this.state.snakePositions.find(x => x.equals(head)));
        gameOverEvents.onValue(() => {
            axios({
                method: 'post',
                url: '/score/' + this.state.score,
            }).then((response) => {
                onSuccess(response);
            }).catch(function (error) {
                console.log(error);
            });
            this.setState({snakePositions: [], score: 0});
        });
    }

    render() {
        return (
            <div className="SnakeGame">
                <div className="SnakeGame-log">Score: {this.state.score}</div>
                <Board
                    size={this.props.boardSize}
                    snakePositions={this.state.snakePositions}
                    fruitPosition={this.state.fruitPosition}
                />
            </div>
        );
    };
}

class Board extends Component {
    render() {
        const { size, snakePositions, fruitPosition } = this.props;
        const rows = _.range(size.y).map(y => {
            const cells = _.range(size.x).map(x => {
                const pos = new Vector(x, y);
                const maybeSnakeStyle = {
                    snake: snakePositions.find(s => s.equals(pos))
                };
                const maybeFruitStyle = { fruit: fruitPosition.equals(pos) };
                return <div key={x} className={classNames("cell", maybeSnakeStyle, maybeFruitStyle)} />;
            });
            return <div key={y} className="row">{cells}</div>;
        });

        return <div className="board">{rows}</div>;
    }
}

// tag::render[]
ReactDOM.render(
	<App />,
    document.getElementById('react')
)

// end::render[]

