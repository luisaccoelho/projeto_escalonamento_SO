import Estado from "./Estado";

const Algoritmo = { //Enumeração dos algoritmos de escalonamento
    SJF: 0,
    FIFO: 1,
    RR: 2,
    EDF: 3
};

const Tabela = { //Enumeração dos estados dos processos na tabela
    ACHEGAR: 0, //Processo ainda não chegou
    EXECUTANDO: 1, //Processo está sendo executado
    ESPERANDO: 2, //Processo está esperando para ser executado
    FINALIZADO: 3, //Processo já foi executado
    SOBRECARGA: 4, //CPU em sobrecarga
    EXECUTANDO_DL: 5, //Variação do estado EXECUTANDO para quando a deadline estourou
    ESPERANDO_DL: 6, //Variação do estado ESPERANDO para quando a deadline estourou
    FINALIZADO_DL: 7 //Variação do estado FINALIZADO para quando a deadline estourou
}

export default class Simulacao {
    constructor(algoritmo, processos=[], tamSobrecarga=0, tamQuantum=1){
        this._estado = new Estado(processos); //Estado atual da simulação
        let sobrecarga = parseInt(tamSobrecarga);
        if(sobrecarga<0) sobrecarga = 0; //Se a sobrecarga for negativa, ela é 0
        this._tamSobrecarga = sobrecarga; //Duração total da sobrecarga
        let quantum = parseInt(tamQuantum);
        if(quantum<1) quantum = 1; //Se o quantum for menor que 1, ele é 1
        this._tamQuantum = quantum;//Duração total do quantum
        this._algoritmo = algoritmo;//Algoritmo de escalonamento
        this._colunas=[];//Array de colunas da tabela
    }

    transicao(){//Aplica um ciclo de processamento baseado no algoritmo de escalonamento e adiciona uma coluna à tabela
        let execucao = null
        switch(this._algoritmo){
            case Algoritmo.SJF:
                execucao = this._estado.transicaoSJF();
                break;
            case Algoritmo.FIFO:
                execucao = this._estado.transicaoFIFO();
                break;
            case Algoritmo.RR:
                execucao = this._estado.transicaoRoundRobin(this._tamQuantum, this._tamSobrecarga);
                break;
            case Algoritmo.EDF:
                execucao = this._estado.transicaoEDF(this._tamQuantum, this._tamSobrecarga);
                break;
            default:
                throw new Error("Algoritmo inválido");
        }
        this._colunas.push(this.coluna(execucao));
    }

    coluna(execucao){//Retorna um array com os estados dos processos, recebe o processo que foi executado
        let processos = this._estado.processos;
        let coluna = [];
        for(let i=0; i<processos.length; i++){
            let processo = processos[i];
            if(!processo.jaChegou()){
                coluna.push(Tabela.ACHEGAR);//Processo ainda não chegou
            }
            else{
                if(execucao === -1 && !processo.terminou){
                    coluna.push(Tabela.SOBRECARGA); //CPU em sobrecarga
                }
                if(this._algoritmo === Algoritmo.EDF && processo.expirou){
                    if(processo.terminou){
                        coluna.push(Tabela.FINALIZADO_DL); //Processo terminado mas expirado
                    }
                    else{
                        if(processo === execucao){
                            coluna.push(Tabela.EXECUTANDO_DL); //Processo em execução mas expirado
                        } else{
                            coluna.push(Tabela.ESPERANDO_DL); //Processo esperando mas expirado
                        }
                    }
                }
                else{
                    if(processo.terminou){
                        coluna.push(Tabela.FINALIZADO); //Processo terminado
                    }
                    else{
                        if(processo === execucao){
                            coluna.push(Tabela.EXECUTANDO); //Processo em execução
                        } else{
                            coluna.push(Tabela.ESPERANDO); //Processo esperando
                        }
                    }
                }
            }
        }
        return coluna;
    }

    get colunas(){
        return this._colunas;
    }

    set colunas(colunas){
        this._colunas = colunas;
    }

    get processos(){
        return this._estado._processos;
    }

    get estado(){
        return this._estado;
    }

    set estado(estado){
        this._estado = estado;
    }

    get tamSobrecarga(){
        return this._tamSobrecarga;
    }

    set tamSobrecarga(tamSobrecarga){
        this._tamSobrecarga = tamSobrecarga;
    }

    get tamQuantum(){
        return this._tamQuantum;
    }

    set tamQuantum(tamQuantum){
        this._tamQuantum = tamQuantum;
    }

    get algoritmo(){
        return this._algoritmo;
    }

    set algoritmo(algoritmo){
        this._algoritmo = algoritmo;
    }
}