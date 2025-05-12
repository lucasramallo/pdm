import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type ScoreLabelProps = {
  score: number;
  player: '' | 'player1' | 'player2';
  turn: 'player1' | 'player2'
};

function ScoreLabel({ score, player, turn }: ScoreLabelProps) {
  return (
    <>
      <View style={[styles.container, { borderColor: turn === player ?  '#00FF91' : '#191B1F' }]}>
        {
          player === 'player1' ? (
            <Image
              source={require('../../assets/images/Avatar.png')}
              style={{ width: 50, height: 50 }}
            />
          ) : (
            <Image
              source={require('../../assets/images/Avatar2.png')}
              style={{ width: 52, height: 50 }}
            />
          )
        }
        {
          player === 'player1' ? (
          <Image
            source={require('../../assets/images/Ellipse.png')}
            style={{ width: 30, height: 30 }}
          />
          ) : (
            <Image
              source={require('../../assets/images/x.png')}
              style={{ width: 30, height: 30 }}
            />
          )
        }
        <Text style={styles.text}>{score}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#252C37',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    padding: 10,
    height: 80,
    borderWidth: 0.5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default ScoreLabel;
