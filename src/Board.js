import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: .25
  };

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    }

    this.createBoard = this.createBoard.bind(this);
    this.randomizeBoard = this.setBoard.bind(this);
    this.randomChance = this.randomChance.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    // Get rows and columns from props
    let nrows = this.props.nrows;
    let ncols = this.props.ncols;
    // Randomly light some parts of the board
    let board = this.setBoard(nrows, ncols);
    return board
  }

  // Generates a random board nested array
  setBoard( nrows, ncols) {
    let array = []
    for(let i = 0; i < nrows; i++){
      let subarray = []
      for(let i = 0; i < ncols; i++){
        if (this.randomChance()){
          subarray.push(true);
        } else {
          subarray.push(false);
        }
      }
      array.push(subarray);
    }
    return array;
  }

  randomChance(){
    return Math.random() < this.props.chanceLightStartsOn;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y, x-1);
    flipCell(y, x+1);
    flipCell(y-1, x);
    flipCell(y+1, x);

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board: board, hasWon: hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else
    if(this.state.hasWon){
      return (
        <div className='Board-title'>
          <div className='winner'>
            <span className='neon-orange'>You</span>
            <span className='neon-blue'>Win!</span>
          </div>
        </div>
      );
    }

    // make table board

    let tblBoard = [];
    for(let y = 0; y < this.props.nrows; y++){
      let row = [];
      for(let x = 0; x < this.props.ncols; x++){
        let coord = y + "-" + x;
        row.push(<Cell 
          key={coord} 
          isLit={this.state.board[y][x]}
          flipCellsAroundMe={() => this.flipCellsAround(coord)}
        />);
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }

    return (
      <div>
        <div className='Board-title'>
          <div className='neon-orange'>Lights</div>
          <div className='neon-blue'> Out </div>
        </div>
        <table className='Board'>
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
  }
}


export default Board;
