import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

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
          subarray.push('t');
        } else {
          subarray.push('f');
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

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({board});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    let tblBoard = [];
    for(let y = 0; y < this.props.nrows; y++){
      let row = [];
      for(let x = 0; x < this.props.ncols; x++){
        row.push(<Cell isLit={this.state.board[x][y]} />);
      }
      tblBoard.push(<tr>{row}</tr>);
    }

    return (
      <table className='Board'>
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }
}


export default Board;
