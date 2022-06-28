//* Connect Four
//  *
//  * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
//  * column until a player gets four-in-a-row (horiz, vert, or diag) or until
//  * board fills (tie)
//  */
//changed to const for these values will stay the same throughout
const WIDTH = 7;
const HEIGHT = 6;
  
//changed to let so the variable can be re-assigned, but not redeclared
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
 
/** makeBoard: create in-JS board structure:
*    board = array of rows, each row is array of cells  (board[y][x])
*/
 
function makeBoard() {
  for (let y = 0; y < HEIGHT ; y++) {
    board.push(Array.from({ length: WIDTH })); //length: WIDTH : 7
 }
} 

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const board = document.getElementById('board');
  // Get "htmlBoard" variable from the item in HTML w/ID of "board"
 
  // top will create an element "tr", with an attribute of "id" and "column-top" when a click  on  upon the click of top row
  const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
  
   //using a loop, this code creates the top row with the attributes "id" and the current x value. 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }

   board.append(top); 
 
   // Using a for loop to create the rows for the board, then another for loop to create the cells for the game board.  
   // append the rows to the htmlBoard and the cells to the row 
   for (let y = 0; y < HEIGHT; y++) { //changed var to let
     const row = document.createElement("tr");

     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     board.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
  const piece = document.createElement('div') //create a new div element called "piece"
  piece.classList.add('piece'); //add the class piece to the new div. 
  piece.classList.add(`p${currPlayer}`); //add the class p + the currPlayer
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece); // append this piece to the available spot.
}
 
 /** endGame: announce game end */
 
function endGame(msg) {
  alert(msg);// pop up alert message
}
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id; //changed var to const
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   board [y][x] = currPlayer;
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   if (board.every(row => row.every(cell => cell))) {
    return endGame ('Tie');
   }
   // switch players (turnary operators if currPlayer = 1, then 2, if not then 1)
   currPlayer = currPlayer === 1 ? 2 : 1; //switch currPlayer 1 <-> 2
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   //*** Need help understanding this code: read and understand this code. Add comments to help you.
 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       
      //possible ways to win:
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();