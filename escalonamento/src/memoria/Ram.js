export default class Ram{
    constructor(processos=[],fila=[],t=0,algoritmo){//O t é o tempo atual da simulação
        this._fila = fila;//Estado atual da fila
        this._processos = processos;//Todos os processos que ainda não chegaram
        if(t===0){//Se o tempo é igual a 0, cria a fila do 0 e já adiciona os processos que chegam no tempo 0 à fila
            this.chegam(0);
        }
        this._tamanho = 400000;
        this._ocupado = 0;
        this._algoritmo = algoritmo;
    }

    entra(processo){//Adiciona um processo na RAM, caso não haja espaço chama sai(processo) onde processo é escolhido a partir do algoritmo em vigor
        if(this._tamanho-this._ocupado>=processo.tamamho) {//Um processo só é adicionado caso haja espaço para todas as suas páginas
            this._fila.push(processo);
            this._ocupado += processo.tamamho;
        } else {
            switch (this._algoritmo){
                case 'FIFO':
                    this._fila.shift(); //Tira o processo que entrou há mais tempo (o primeiro da fila)
                    this.entra(processo);
                    return this._fila;
                case 'MRU':
                    let menosRecentementeUtilizado = this._fila[0];
                    for(let i=0;i<this._fila.length;i++){
                        if(this._fila[i].ultimaChamada<menosRecentementeUtilizado){ //Procura o processo chamado a menos tempo
                            menosRecentementeUtilizado = this._fila[i];
                        }
                    }
                    this.sai(menosRecentementeUtilizado); //Retira o processo utilizado a menos tempo
                    this.entra(processo);
                    return this._fila;
            } 
        }
        return this._fila;
    }

    sai(processo){//Remove processo da fila
        if(this._fila.length===0){//Se a fila está vazia, retorna null
            return null;
        }
        for(let i=0;i<this._fila.length;i++){
            if(this._fila[i]===processo){
                this._fila.splice(i, 1);
            }
        }
        return this._fila;
    }

    atualizaRam(t){//Adiciona no fim da fila todos os processos que chegam no tempo t (na ordem em que aparecem no array de processos)
        let processosVerdes = [];
        for(let i=0;i<this._processos.length;i++){
            if(this._processos[i].tempoChegada===t) this.entra(this._processos[i]);
            else processosVerdes.push(this._processos[i]);
        }
        this._processos = processosVerdes;
    }
}