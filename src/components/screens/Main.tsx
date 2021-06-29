import React, {useState, useEffect} from 'react';
import Board from '../Game';
import Status from '../Status';
import {PLAYERS, STATUS, winningCombinations} from '../../Utils/constants';
import ReplayButton from '../ReplayButton';
import { View } from 'react-native';

export interface BoardCell {
  value: string;
  isMarked: boolean;
  isWinCondition: boolean;
}

const Game = () => {
  
  const buildSquare = (): BoardCell => ({
    value: '',
    isMarked: false,
    isWinCondition: false,
  });

  const initialState = {
    squares: Array.apply(null, {length: 9}).map(buildSquare),
    isXNext: true,
    status: STATUS.init,
  };

  const [squares, setSquares] = useState<Array<BoardCell>>(
    initialState.squares,
  );
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [status, setStatus] = useState<string>(STATUS.init);

  const initialize: () => void = () => {
    setSquares(initialState.squares);
    setIsXNext(initialState.isXNext);
    setStatus(initialState.status);
  };

  const checkMatchingSquares = (sq1, sq2, sq3) => {
    const isValuesEqual = sq1.value === sq2.value && sq2.value === sq3.value;
    const isMarked = sq1.isMarked && sq2.isMarked && sq3.isMarked;

    return isMarked && isValuesEqual;
  };

  const isGameOver = (): boolean =>
    status === STATUS.draw || status === STATUS.win;

  const current = (): string => (isXNext ? PLAYERS.X : PLAYERS.O);

  const calculateWinner = squares => {
    let winner = null;
    let combination = null;
    winningCombinations.forEach(([idx1, idx2, idx3]) => {
      if (checkMatchingSquares(squares[idx1], squares[idx2], squares[idx3])) {
        winner = squares[idx1];
        combination = [idx1, idx2, idx3];
      }
    });
    return {winner, combination};
  };

  const buildReplayButton = ()=> {
    return  isGameOver() && <ReplayButton onPress={initialize} />
  }

  const player = () =>
    isGameOver() ? (isXNext ? PLAYERS.O : PLAYERS.X) : current();

  const turn = squareIdx => {
    const cells = [...squares];
    cells[squareIdx] = {
      ...cells[squareIdx],
      value: current(),
      isMarked: true,
    };
    setSquares(cells);
  };

  const handlePress = (squareIdx: any) => {
    setStatus(STATUS.play);
    turn(squareIdx);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const winning = combination => {
      setStatus(STATUS.win);

      const cells = [...squares];
      combination.forEach(idx => {
        cells[idx] = {
          ...cells[idx],
          isWinCondition: true,
        };
      });

      setSquares(cells.map(cell => ({...cell, isMarked: true})));
    };

    const checkIfDraw = () => {
      const isAllCellFilled = !squares.some(s => !s.isMarked);
      isAllCellFilled && setStatus(STATUS.draw);
    };

    if (status === STATUS.play) {
      const {winner, combination} = calculateWinner(squares);
      winner ? winning(combination) : checkIfDraw();
    }
  }, [squares, status]);

  return (
    <View>
      <Board squares={squares} onSquarePress={handlePress} />
      <Status status={status} player={player()} />
      {buildReplayButton()}
    </View>
  );
};

export default Game;
