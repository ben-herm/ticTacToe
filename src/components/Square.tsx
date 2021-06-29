import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Theme from '../theme/colors';
import PropTypes from 'prop-types';
import {PLAYERS} from '../Utils/constants';

const Square = (props) => {
  const backgroundColor = props.isWin ? Theme.Colors.Red : Theme.Colors.Yellow;
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      disabled={props.isMarked}
      onPress={props.onPress}>
      <Text style={styles.value}>{props.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderColor: Theme.Colors.Background,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: Theme.Colors.Yellow,
  },
  value: {
    color: Theme.Colors.Red,
    fontWeight: 'bold',
    fontSize: 40,
  },
});

Square.propTypes = {
  value: PropTypes.oneOf([PLAYERS.X, PLAYERS.O, '.']).isRequired,
  isWin: PropTypes.bool.isRequired,
  isMarked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Square;
