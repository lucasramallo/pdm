import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalComponent from "./components/Modal";
import ScoreLabel from "./components/ScoreLabel";
import Jogador from "./core/jogo/Jogador";
import JogadorAutomatizado from "./core/jogo/JogadorAutomatizado";
import Jogo from "./core/jogo/Jogo";
import { Peca } from "./core/jogo/Peca";
import { SituacaoPartida } from "./core/jogo/SituacaoPartida";

export default function Index() {
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');
  const [jogo] = useState(new Jogo(new Jogador("Você"), new JogadorAutomatizado("CPU")));
  const [partida, setPartida] = useState(() => jogo.iniciaPartida());
  const [matrix, setMatrix] = useState(partida.getTabuleiro().map(row => [...row]));
  const [winFlag, setWinFlag] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [winner, setWinner] = useState("");
  
  useEffect(() => {
    setMatrix(partida.getTabuleiro().map(row => [...row]));
  }, [partida]);
  
  const elipseImage = require('../assets/images/Ellipse.png');
  const xImage = require('../assets/images/x.png');

  const atualizarMatrix = () => {
    setMatrix(partida.getTabuleiro().map(row => [...row]));
  };

  const handleCellPress = async (row: number, col: number) => {
    if (partida.getTabuleiro()[row][col]) return;
  
    if (partida.joga(row, col)) {
      atualizarMatrix();
      verificarSituacaoPartida();
  
      if (partida.verificaFim() === SituacaoPartida.EmAndamento) {
        setCurrentPlayer('player2');
  
        setTimeout(() => {
          const jogadaCpu = (jogo.getJogador2() as JogadorAutomatizado).realizaJogada(partida.getTabuleiro(), partida);
          if (jogadaCpu) {
            partida.joga(jogadaCpu[0], jogadaCpu[1]);
            atualizarMatrix();
            verificarSituacaoPartida();
            setCurrentPlayer('player1');
          }
        }, 1000);
      }
    }
  };
  
  const verificarSituacaoPartida = () => {
    const situacao = partida.verificaFim();
    switch (situacao) {
      case SituacaoPartida.VitoriaJogador1:
        partida.getJogador1().adicionaVitoria();
        setWinFlag(true);
        setModalVisible(true);
        setCurrentPlayer('player1');
        setWinner("Você");
        setPartida(jogo.iniciaPartida());
        break;
  
      case SituacaoPartida.VitoriaJogador2:
        partida.getJogador2().adicionaVitoria();
        setWinFlag(true);
        setModalVisible(true);
        setCurrentPlayer('player1');
        setWinner("CPU");
        setPartida(jogo.iniciaPartida());
        break;
  
      case SituacaoPartida.Empate:
        setWinFlag(true);
        setModalVisible(true);
        setPartida(jogo.iniciaPartida());
        setMatrix(partida.getTabuleiro().map(row => [...row]));
        setWinFlag(false);
        setCurrentPlayer('player1');
        setWinner("Empate");
        break;
    }
  };

  const onPressModal = () => {
    
  };

  const renderCell = (peca: Peca | undefined) => {
    if (peca === Peca.Xis) return <Image source={xImage} style={{ width: 50, height: 50 }} />;
    if (peca === Peca.Circulo) return <Image source={elipseImage} style={{ width: 50, height: 50 }} />;
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScoreLabel score={partida.getJogador1().getVitorias()} player="player1" turn={currentPlayer} />
        <ScoreLabel score={partida.getJogador2().getVitorias()} player="player2" turn={currentPlayer} />
      </View>

      <View style={styles.board}>
        {matrix.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((cell, j) => (
              <TouchableOpacity key={j} style={styles.cell} onPress={() => handleCellPress(i, j)}>
                {renderCell(cell)}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      {
        currentPlayer === 'player1' ?
          <Text style={[styles.bottonSpan, { color: '#00FF91'}]}>Sua vez!</Text> :
          <Text style={[styles.bottonSpan, { color: '#fff'}]}>Vez da CPU.</Text>
      }
      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} winner={winner}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#191B1F',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    backgroundColor: '#191B1F',
    padding: 20,
    width: '100%',
    height: 100,
    marginBottom: 50,
  },
  board: {
    backgroundColor: '#2F323F',
    width: '90%',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    margin: 6,
    aspectRatio: 1,
    backgroundColor: '#191B1F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  cellText: {
    color: '#FFF',
    fontSize: 24,
  },
  bottonSpan: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
  },
});
