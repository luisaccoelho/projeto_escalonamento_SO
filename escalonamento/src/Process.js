export default class Process {
    constructor(
        id,
        tempoChegada,
        tempExec,
        deadline,
        prioridade,
        tamanho,
        elapsedTime = 0,
        tempoEspera = 0
    ) {
        this._id = id;
        tempoChegada = parseInt(tempoChegada);
        if(tempoChegada<0){
            this._tempoChegada = 0;
        } else{
            this._tempoChegada = tempoChegada;
        }
        tempExec = parseInt(tempExec);
        if(tempExec<1){
            this._tempExec = 1;
        } else{
            this._tempExec = tempExec;
        }
        this._deadline = deadline;
        this._prioridade = prioridade;
        tamanho = parseInt(tamanho);
        if(tamanho<1){
            this._tamanho = 1;
        } else if(tamanho>10){
            this._tamanho = 10;
        } else {
            this._tamanho = tamanho;
        }
        this._elapsedTime = elapsedTime;
        this._tempoEspera = tempoEspera;
        this._expirou = this._deadline < 0;
        this._terminou = this._elapsedTime === this._tempExec;
    }

    toString() {
        return `Processo ${this._id}\nChegada: ${this._tempoChegada}\nExecução: ${this._tempExec}\nDeadline: ${this._deadline}\nPrioridade: ${this._prioridade}\nTamanho: ${this._tamanho}`;
    }

    getTurnaround() {
        return this._tempoEspera + this._elapsedTime;
    }

    incrementaElapsedTime() {
        this._elapsedTime++;
        this._deadline--;
        this._terminou = this._elapsedTime === this._tempExec;
        if (this._deadline < 0) {
            this._expirou = true;
        }
        return this;
    }

    incrementaTempoEspera() {
        this._tempoEspera++;
        this._deadline--;
        if (this._deadline < 0) {
            this._expirou = true;
        }
        return this;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
        return this;
    }

    get tempoChegada() {
        return this._tempoChegada;
    }

    set tempoChegada(value) {
        this._tempoChegada = value;
        return this;
    }

    get tempExec() {
        return this._tempExec;
    }

    set tempExec(value) {
        this._tempExec = value;
        return this;
    }

    get deadline() {
        return this._deadline;
    }

    set deadline(value) {
        this._deadline = value;
        return this;
    }

    get prioridade() {
        return this._prioridade;
    }

    set prioridade(value) {
        this._prioridade = value;
        return this;
    }

    get tamanho() {
        return this._tamanho;
    }

    set tamanho(value) {
        this._tamanho = value;
        return this;
    }

    get tempoEspera() {
        return this._tempoEspera;
    }

    set tempoEspera(value) {
        this._tempoEspera = value;
        return this;
    }

    get expirou() {
        return this._expirou;
    }

    set expirou(value) {
        this._expirou = value;
        return this;
    }

    get terminou() {
        return this._terminou;
    }

    set terminou(value) {
        this._terminou = value;
        return this;
    }

    get elapsedTime() {
        return this._elapsedTime;
    }

    set elapsedTime(value) {
        this._elapsedTime = value;
        return this;
    }
}