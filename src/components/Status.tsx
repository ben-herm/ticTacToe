import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {STATUS, PLAYERS} from '../Utils/constants';
import Theme from '../theme/colors';
import PropTypes from 'prop-types';

const Status = (props) => {
  const buildStatus = (text) => (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );

  switch (props.status) {
    case STATUS.init:
    case STATUS.play:
      return buildStatus('🎬 Next Player ' + props.player);
    case STATUS.win:
      return buildStatus(props.player + ' Is The Winner 🤩😎🥳');
    case STATUS.draw:
      return buildStatus('🤨😱😜 GAME OVER');
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Theme.Colors.Blue,
  },
  text: {
    textAlign: 'center',
    color: Theme.Colors.Text,
    fontSize: 25,
  },
});

Status.propTypes = {
  player: PropTypes.oneOf([PLAYERS.X, PLAYERS.O]).isRequired,
  status: PropTypes.oneOf([STATUS.draw, STATUS.init, STATUS.play, STATUS.win])
    .isRequired,
};

export default Status;
