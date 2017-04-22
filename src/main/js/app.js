'use strict';

// tag::vars[]
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames";
import _ from "underscore";
// end::vars[]

// tag::app[]
class App extends Component {

	render() {
		return (
		    <div>
                <h1>BOARD:</h1>
                <SnakeGame boardSize={new Vector(20, 20)} />
            </div>
		)
	}
}
// end::app[]

class SnakeGame extends Component {
	render() {
        return (
			<div className="SnakeGame">
				<div className="SnakeGame-log">Score: </div>
                <Board
                    size={this.props.boardSize}
                />
			</div>
        );
    }
}

class Board extends Component {
    render() {
        const rows = _.range(this.props.size.y).map(y => {
            const cells = _.range(this.props.size.x).map(x => {
                const pos = new Vector(x, y);
                return <div className={classNames("cell")} />;
            });
            return <div className="row">{cells}</div>;
        });

        return <div className="board">{rows}</div>;
    }
}

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

// tag::render[]
ReactDOM.render(
	<App />,
    document.getElementById('react')
)

// end::render[]

