import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squareValues: Array(9).fill(null),
            currentPlayerValue: 'X'
        };
        console.log(this.state.currentPlayerValue);
    }

    renderSquare(squareIndex) {
        return (
            <Square
                value={this.getSquareValue(squareIndex)}
                onClick={() => this.onSquareClicked(squareIndex)}
            />
        );
    }

    getNextPlayerValue() {
        if (this.state.currentPlayerValue === 'X') return 'O';
        return 'X';
    }

    getSquareValue(squareIndex) {
        return this.state.squareValues[squareIndex];
    }

    canClickSquare(squareIndex) {
        return (!this.squareHasValue(squareIndex) && !calculateWinner(this.state.squareValues));
    }

    squareHasValue(squareIndex) {
        return this.state.squareValues[squareIndex] != null;
    }

    getNewSquareValuesWithSquareClicked(squareIndex) {
        const newSquareValues = this.state.squareValues.slice();
        newSquareValues[squareIndex] = this.state.currentPlayerValue;
        return newSquareValues;
    }

    clickSquare(squareIndex) {
        this.setState({
            ...this.state,
            squareValues: this.getNewSquareValuesWithSquareClicked(squareIndex),
            currentPlayerValue: this.getNextPlayerValue()
        });
    }

    onSquareClicked(squareIndex) {
        if (this.canClickSquare(squareIndex))
            this.clickSquare(squareIndex);

    }

    getWinnerStatus(winner) {
        return "Winner: " + winner;
    }

    getCurrentPlayerStatus(nextPlayerValue) {
        return "Next player: " + nextPlayerValue;
    }

    getStatus() {
        const winner = calculateWinner(this.state.squareValues);
        if (winner) return this.getWinnerStatus(winner);
        return this.getCurrentPlayerStatus(this.state.currentPlayerValue);
    }

    render() {

        return (
            <div>
                <div className="status">{this.getStatus()}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);
