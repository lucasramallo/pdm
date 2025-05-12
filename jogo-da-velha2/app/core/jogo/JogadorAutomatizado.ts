import Jogador from "./Jogador";
import Partida from "./Partida";
import { Peca } from "./Peca";
import { SituacaoPartida } from "./SituacaoPartida";

export default class JogadorAutomatizado extends Jogador {

    constructor(nome: string) {
        super(nome);
    }

    public realizaJogada(tabuleiro: (Peca | undefined)[][], partida: Partida): [number, number] | undefined {
        const resultado = this.minMax(tabuleiro, true, partida);
        return resultado.movimento;
    }
    
    public minMax(tabuleiro: (Peca | undefined)[][], max: boolean, partida: Partida): { score: number, movimento?: [number, number] } {
        let situacao: SituacaoPartida = partida.verificaFim();
    
        if (situacao === SituacaoPartida.VitoriaJogador1) return { score: -1 };
        if (situacao === SituacaoPartida.VitoriaJogador2) return { score: 1 };
        if (situacao === SituacaoPartida.Empate) return { score: 0 };
    
        let melhorScore = max ? -Infinity : Infinity;
        let melhorMovimento: [number, number] | undefined = undefined;
    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tabuleiro[i][j] === undefined) {
                    // Simular jogada
                    tabuleiro[i][j] = max ? Peca.Xis : Peca.Circulo;
    
                    const resultado = this.minMax(tabuleiro, !max, partida);
    
                    // Desfazer joga
                    tabuleiro[i][j] = undefined;
    
                    if (max) {
                        if (resultado.score > melhorScore) {
                            melhorScore = resultado.score;
                            melhorMovimento = [i, j];
                        }
                    } else {
                        if (resultado.score < melhorScore) {
                            melhorScore = resultado.score;
                            melhorMovimento = [i, j];
                        }
                    }
                }
            }
        }
    
        return { score: melhorScore, movimento: melhorMovimento };
    }
}