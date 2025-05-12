import Jogador from "./Jogador";
import { Peca } from "./Peca";
import { SituacaoPartida } from "./SituacaoPartida";

export default class Partida {

    private jogador1: Jogador;
    private jogador2: Jogador;
    private tabuleiro: (Peca | undefined)[][];
    private vezJogador1: boolean;

    constructor(jogador1: Jogador, jogador2: Jogador) {
        this.jogador1 = jogador1;
        this.jogador2 = jogador2;
        this.tabuleiro = [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]];
        this.vezJogador1 = true;
    }

    public getJogador1(): Jogador {
        return this.jogador1;
    }

    public getJogador2(): Jogador {
        return this.jogador2;
    }

    public getTabuleiro(): (Peca | undefined)[][] {
        return this.tabuleiro;
    }

    public getVezJogador1(): boolean {
        return this.vezJogador1;
    }

    public joga(linha: number, coluna: number): boolean {
        if (this.tabuleiro[linha][coluna] == undefined) {
            if (this.vezJogador1) {
                this.tabuleiro[linha][coluna] = Peca.Circulo;
            } else {
                this.tabuleiro[linha][coluna] = Peca.Xis;
            }
    
            this.vezJogador1 = !this.vezJogador1;
            return true;
        } else {
            return false;
        }
    }

    private extraiLinha(i: number) {
        return this.tabuleiro[i];
    }

    private extraiColuna(i: number) {
        return [this.tabuleiro[0][i], this.tabuleiro[1][i], this.tabuleiro[2][i]]
    }

    private extraiDiagonalPrincipal() {
        return [this.tabuleiro[0][0], this.tabuleiro[1][1], this.tabuleiro[2][2]];
    }

    private extraiDiagonalSecundaria() {
        return [this.tabuleiro[0][2], this.tabuleiro[1][1], this.tabuleiro[2][0]];
    }

    private verificaVencedor(trinca: (Peca | undefined)[]): SituacaoPartida | undefined {
        if (trinca.filter( e => e == trinca[0] ).length == 3) {
            if (trinca[0] == Peca.Xis) {
                return SituacaoPartida.VitoriaJogador1;
            } else if (trinca[0] == Peca.Circulo) {
                return SituacaoPartida.VitoriaJogador2;
            } else {
                return undefined
            }
        } else {
            return undefined;
        }
    }

    private verificaEmpate(): SituacaoPartida | undefined {
        const pecas = [ ...this.tabuleiro[0], ...this.tabuleiro[1], ...this.tabuleiro[2] ];
        if (pecas.filter( e => e != undefined ).length == 9) {
            return SituacaoPartida.Empate;
        } else {
            return undefined;
        }
    }

    public verificaFim(): SituacaoPartida {

        let situacao: SituacaoPartida | undefined = undefined;

        for (let i = 0; i < 3; i++) {
            situacao = this.verificaVencedor(this.extraiLinha(i));
            if (situacao != undefined) {
                return situacao;
            }
        }

        for (let i = 0; i < 3; i++) {
            situacao = this.verificaVencedor(this.extraiColuna(i));
            if (situacao != undefined) {
                return situacao;
            }
        }
        
        situacao = this.verificaVencedor(this.extraiDiagonalPrincipal());
        if (situacao != undefined) {
            return situacao;
        }

        situacao = this.verificaVencedor(this.extraiDiagonalSecundaria());
        if (situacao != undefined) {
            return situacao;
        }

        situacao = this.verificaEmpate();
        if (situacao != undefined) {
            return situacao;
        }
        
        return SituacaoPartida.EmAndamento;
    }
    
    public clone(): Partida {
        const novaPartida = Object.create(Partida.prototype) as Partida;
    
        // Copia jogadores por referência (sem problema)
        novaPartida.jogador1 = this.jogador1;
        novaPartida.jogador2 = this.jogador2;
    
        // Cópia profunda do tabuleiro
        novaPartida.tabuleiro = this.tabuleiro.map(linha => [...linha]);
    
        // Copiar vez corretamente
        novaPartida.vezJogador1 = this.vezJogador1;
    
        return novaPartida;
    }
    
}