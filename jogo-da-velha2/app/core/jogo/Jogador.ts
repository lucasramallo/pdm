export default class Jogador {

    private nome: string;
    private vitorias: number;

    constructor(nome: string) {
        this.nome = nome;
        this.vitorias = 0;
    }

    public getNome(): string {
        return this.nome;
    }

    public getVitorias(): number {
        return this.vitorias;
    }

    public adicionaVitoria(): void {
        this.vitorias++;
    }

    public reinicia(): void {
        this.vitorias = 0;
    }
}