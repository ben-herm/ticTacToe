// import {wins} from './constants';

// const buildCell = () => ({
//   value: '.',
//   isFilled: false,
//   isWin: false,
// });

// export const buildBoard = () => Array.apply(null, {length: 9}).map(buildCell);

// export const calculateWinner = (squares) => {
//   let winner = null;
//   let combination = null;
//   wins.forEach(([idx1, idx2, idx3]) => {
//     if (isSquaresMatch(squares[idx1], squares[idx2], squares[idx3])) {
//       winner = squares[idx1];
//       combination = [idx1, idx2, idx3];
//     }
//   });
//   return {winner, combination};
// };
