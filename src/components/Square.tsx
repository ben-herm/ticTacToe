import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Theme from '../theme/theme';
import PropTypes from 'prop-types';
import {PLAYERS} from '../Utils/constants';
import { BoardCell } from '../screens/Main';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Square:React.FC<BoardCell>= (props): React.ReactElement  => {
  const backgroundColor = props.isWinCondition ? Theme.Colors.White : Theme.Colors.Green;
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
    width: wp('25%'),
    backgroundColor: Theme.Colors.Yellow,
  },
  value: {
    color: Theme.Colors.Red,
    fontWeight: 'bold',
    fontSize: 40,
  },
});

Square.propTypes = {
  value: PropTypes.oneOf([PLAYERS.X, PLAYERS.O, '']),
  isWinCondition: PropTypes.bool.isRequired,
  isMarked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Square;
