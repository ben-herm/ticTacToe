import React, { useState, useEffect } from 'react';
import Board from '../components/GameBoard';
import Status from '../components/Status';
import { PLAYERS, STATUS, winningCombinations } from '../Utils/constants';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../theme/theme';
import { Header } from 'react-native-elements';

export interface BoardCell {
  value: string;
  isMarked: boolean;
  isWinCondition: boolean;
  onPress?: () => void
}

type Winner = {
  winner: BoardCell,
  winningSquares: Array<number>
}

const Main: React.FC = (): React.ReactElement => {

  const buildSquare = (): BoardCell => ({
    value: '',
    isMarked: false,
    isWinCondition: false,
  });

  const initialState = {
    squares: Array.apply(null, { length: 9 }).map(buildSquare),
    NextPlayer: true,
    status: STATUS.init,
  };

  const [squares, setSquares] = useState<Array<BoardCell>>(
    initialState.squares,
  );
  const [NextPlayer, setNextPlayer] = useState<boolean>(initialState.NextPlayer);
  const [status, setStatus] = useState<string>(initialState.status);

  const reInitialize = (): void => {
    setSquares(initialState.squares);
    setNextPlayer(initialState.NextPlayer);
    setStatus(initialState.status);
  };

  // UTILITY METHODS
  const checkMatchingSquares = (sq1, sq2, sq3): boolean => {
    const isValuesEqual = sq1.value === sq2.value && sq2.value === sq3.value;
    const isMarked = sq1.isMarked && sq2.isMarked && sq3.isMarked;

    return isMarked && isValuesEqual;
  };

  const checkIfGameOver = (): boolean =>
    status === STATUS.draw || status === STATUS.win;

  const currentPlayer = (): string => (NextPlayer ? PLAYERS.X : PLAYERS.O);

  const calculateWinner = (squares): Winner => {
    let winner: BoardCell = null;
    let winningSquares: Array<number> = null;
    winningCombinations.forEach(([idx1, idx2, idx3]) => {
      if (checkMatchingSquares(squares[idx1], squares[idx2], squares[idx3])) {
        winner = squares[idx1];
        winningSquares = [idx1, idx2, idx3];
      }
    });
    return { winner, winningSquares };
  };


  const buildReplayButton = (): React.ReactElement => {
    return checkIfGameOver() &&
      <TouchableOpacity style={styles.buttonContainer} onPress={reInitialize}>
        <Text style={styles.text}>{'Replay'}</Text>
      </TouchableOpacity>;

  }

  const player = (): string =>
    (NextPlayer ? 'Player 1' : 'Player 2');

  const turn = (squareIdx): void => {
    const cells = [...squares];
    cells[squareIdx] = {
      ...cells[squareIdx],
      value: currentPlayer(),
      isMarked: true,
    };
    setSquares(cells);
  };

  const handlePress = (squareIdx: any): void => {
    setStatus(STATUS.play);
    turn(squareIdx);
    setNextPlayer(!NextPlayer);
  };

  useEffect((): void => {
    const winning = combination => {
      setStatus(STATUS.win);

      const cells = [...squares];
      combination.forEach(idx => {
        cells[idx] = {
          ...cells[idx],
          isWinCondition: true,
        };
      });

      setSquares(cells.map(cell => ({ ...cell, isMarked: true })));
    };

    const checkIfDraw = (): void => {
      const isAllCellFilled = !squares.some(s => !s.isMarked);
      isAllCellFilled && setStatus(STATUS.draw);
    };

    if (status === STATUS.play) {
      const { winner, winningSquares } = calculateWinner(squares);
      winner ? winning(winningSquares) : checkIfDraw();
    }
  }, [squares, status]);

  return (
    <>
      <Header
        placement="center"
        // leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> {console.log()}}}
        centerComponent={{ text: 'Tic Tac Toe - Ben Herman', style: { color: '#fff' } }}
      // rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Status status={status} player={player()} />
        <Board squares={squares} onSquarePress={handlePress} />
        {buildReplayButton()}
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: Theme.Colors.Green,
  },
  text: {
    textAlign: 'center',
    color: Theme.Colors.Blue,
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default Main;
