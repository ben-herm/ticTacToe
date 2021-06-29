import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Theme from '../theme/colors';
import PropTypes from 'prop-types';

const ReplayButton = (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Text style={styles.text}>{'Replay'}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
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

ReplayButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default ReplayButton;
