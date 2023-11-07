export default class Fila {//Estrutura para ser utilizada no FIFO e Round Robin
    constructor(fila=[]){ //O construtor pode receber como argumento uma fila já existente, mas por padrão inicia um vetor vazio
        this._fila = fila;
    }

    entra(processo){//Adiciona um processo no final da fila e retorna o array
        this._fila.push(processo);
        return this._fila;
    }

    preempta(){//Joga o primeiro processo da fila para o final e retorna o array
        processo = this._fila.shift();
        this.entra(processo);
        return this;
    }

    sai(){//Remove o primeiro processo da fila e retorna o processo removido
        return this._fila.shift();
    }
    
    get primeiro(){//Retorna o primeiro processo da fila
        return this._fila[0];
    }

    get fila(){
        return this._fila;
    }

    set fila(fila){
        this._fila = fila;
    }
}