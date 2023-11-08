export default class Fila {//Estrutura para ser utilizada no FIFO e Round Robin
    constructor(processos=[],fila=[],t=0){//O t é o tempo atual da simulação
        this._fila = fila;//Estado atual da fila
        this._processos = processos;//Todos os processos que ainda não chegaram
        if(t=0){//Se o tempo é igual a 0, cria a fila do 0 e já adiciona os processos que chegam no tempo 0 à fila
            this.chegam(0);
        }
    }

    entra(processo){//Adiciona um processo no final da fila e retorna o array
        this._fila.push(processo);
        return this._fila;
    }

    sai(){//Remove o primeiro processo da fila e retorna o processo removido
        if (this._fila.length===0){//Se a fila está vazia, retorna null
            return null;
        }
        return this._fila.shift();
    }

    chegam(t){//Adiciona no fim da fila todos os processos que chegam no tempo t (na ordem em que aparecem no array de processos)
        for(let i=0;i<this._processos.length;i++){
            if(this._processos[i].tempoChegada===t){
                this.entra(this._processos[i]);
                this.processos.splice(i,1);
            }
        }
    }
    
    get primeiro(){//Retorna o primeiro processo da fila ou null se a fila estiver vazia
        if(this._fila.length===0){
            return null;
        }
        return this._fila[0];
    }

    get processos(){//Retorna o array de processos
        return this._processos;
    }

    set processos(processos){//Altera o array de processos
        this._processos = processos;
    }

    get fila(){
        return this._fila;
    }

    set fila(fila){
        this._fila = fila;
    }
}