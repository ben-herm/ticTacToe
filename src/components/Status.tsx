import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { STATUS, PLAYERS } from '../Utils/constants';
import Theme from '../theme/theme';
import PropTypes from 'prop-types';

interface StatusProps {
  status: string;
  player: string,
}

const Status: React.FC<StatusProps>  = (props): React.ReactElement => {
  const buildStatus = (text: String): React.ReactElement=> (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );

  switch (props.status) {
    case STATUS.init:
      return buildStatus(props.player + ' make your first move!');
    case STATUS.play:
      return buildStatus('Next Player ' + props.player);
    case STATUS.win:
      return buildStatus(props.player + ' Is The Winner 😎');
    case STATUS.draw:
      return buildStatus('🤨😱😜 GAME OVER');
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    // backgroundColor: Theme.Colors.Blue,
  },
  text: {
    textAlign: 'center',
    color: Theme.Colors.Black,
    fontSize: 25,
  },
});

Status.propTypes = {
  player: PropTypes.oneOf(['Player 1', 'Player 2']).isRequired,
  status: PropTypes.oneOf([STATUS.draw, STATUS.init, STATUS.play, STATUS.win])
    .isRequired,
};

export default Status;
