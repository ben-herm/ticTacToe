type CurrentGameState  = {
  init: string,
  draw: string,
  win: string,
  play: string
}

export const PLAYERS = {
    X: 'X',
    O: 'O',
  };
  
  export const STATUS:CurrentGameState = {
    init: 'INIT',
    draw: 'DRAW',
    win: 'WIN',
    play: 'PLAY',
  };
  
  export const winningCombinations: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  