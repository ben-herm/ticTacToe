import React, { ReactNode } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Square from './Square';
import PropTypes from 'prop-types';
import {PLAYERS} from '../Utils/constants';
import { BoardCell } from './screens/Main';

export interface BoardComponentProps {
    squares?: Array<BoardCell>;
    onSquarePress: (squareIdx: number) => void;
  }

const Board: React.FC<BoardComponentProps>  = (props) => (
  <View style={styles.container}>
    {props.squares.map((square, idx) => (
      <Square
        key={idx}
        value={square.value}
        isMarked={square.isMarked}
        isWin={square.isWinCondition}
        onPress={() => props.onSquarePress(idx)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 400,
    marginVertical: 16,
    paddingHorizontal: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.oneOf([PLAYERS.X, PLAYERS.O, '.']).isRequired,
      isMarked: PropTypes.bool.isRequired,
      isWinCondition: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onSquarePress: PropTypes.func.isRequired,
};

export default Board;
