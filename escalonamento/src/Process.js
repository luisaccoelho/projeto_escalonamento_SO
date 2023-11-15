export default class Process {
    constructor(
        id,
        tempoChegada,//Recebe uma string e converte para inteiro
        tempExec,//Recebe uma string e converte para inteiro
        deadline,//Recebe uma string e converte para inteiro
        //prioridade,//Recebe uma string e converte para inteiro
        tamanho,//Recebe uma string e converte para inteiro
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
        this._deadline = parseInt(deadline);
        //this._prioridade = parseInt(prioridade);
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
        this._ultimaChamada = -1;
        this._enderecoRam = -1;
    }

    toString() {
        return `Processo ${this._id}\nChegada: ${this._tempoChegada}\nExecução: ${this._tempExec}\nDeadline: ${this._deadline}\nTamanho: ${this._tamanho}\nTempo de Espera: ${this._tempoEspera}\nExpirou: ${this._expirou}\nTerminou: ${this._terminou}\nElapsed Time: ${this._elapsedTime}\n\n`;
    }   // não conta Prioridade

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

    jaChegou(t){//Recebe um tempo t e retorna se o processo já chegou ou não nesse t
        return this._tempoChegada <= t;
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

    /*
    //Não será utilizada por nenhum algoritmo
    get prioridade() {
        return this._prioridade;
    }

    set prioridade(value) {
        this._prioridade = value;
        return this;
    }
    */

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

    get ultimaChamda() {
        return this._ultimaChamada;
    }

    set ultimaChamda(value) {
        this._ultimaChamada = value;
        return this;
    }

    get enderecoRam() {
        return this._enderecoRam;
    }

    set enderecoRam(value) {
        this._enderecoRam = value;
        return this;
    }
}