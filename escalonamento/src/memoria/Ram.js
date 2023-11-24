export const AlgoritmoMemoria = {
    FIFO: 1,
    MRU: 2
};

export default class Ram{
    constructor(processos=[],algoritmo,ram=[],t=0){//O t é o tempo atual da simulação
        this._ram = ram;//Estado atual da RAM
        this._processos = processos;//Todos os processos que ainda não chegaram
        if(t===0){//Se o tempo é igual a 0, cria a fila do 0 e já adiciona os processos que chegam no tempo 0 à fila
            this.atualizaRam(0);
        }
        this._tamanho = 400000;
        this._ocupado = 0;
        this._algoritmo = algoritmo;
    }

    entra(processo){//Adiciona um processo na RAM, caso não haja espaço sobrescreve de acordo com o algoritmo em vigor
        console.log('Espaço disponível: ' + (this._tamanho - this._ocupado));
        console.log('Tamanho do processo: ' + processo.tamamho);
        if(this._tamanho - this._ocupado >= processo.tamamho) {//Um processo só é adicionado caso haja espaço para todas as suas páginas
            console.log('RAM com espaço de sobra!');
            this._ram.push(processo); //Se há espaço, apenas coloca o processo no final da fila
            processo.enderecoRam = this._ram.length-1;
            this._ocupado += processo.tamamho;
        } else {
            console.log('Sem espaço na RAM, retirando um processo...');
            switch (this._algoritmo){
                case AlgoritmoMemoria.FIFO:
                    console.log('Algoritmo: FIFO');
                    let primeiro = this._ram[0]
                    for(let i=0;i<this._ram.length;i++){
                        if(this._ram[i].tempoChegada<primeiro.tempoChegada){
                            primeiro = this._ram[i];
                        }
                    }
                    this.substitui(primeiro, processo);//Tira o processo que entrou há mais tempo (o primeiro da fila)
                    return this._ram;
                case AlgoritmoMemoria.MRU:
                    console.log('Algoritmo: MRU');
                    let menosRecentementeUtilizado = this._ram[0];
                    for(let i=0;i<this._ram.length;i++){
                        if(this._ram[i].ultimaChamada<menosRecentementeUtilizado){ //Procura o processo chamado a menos tempo
                            menosRecentementeUtilizado = this._ram[i];
                        }
                    }
                    this.substitui(menosRecentementeUtilizado, processo); //Retira o processo utilizado a menos tempo
                    return this._ram;
            } 
        }
        return this._ram;
    }

    substitui(processoAntigo, processoNovo){//Remove processo da fila
        if(this._ram.length===0){//Se a fila está vazia, retorna null
            return null;
        }
        for(let i=0;i<this._ram.length;i++){
            if(this._ram[i]===processoAntigo){
                this._ram.splice(i, 1, processoNovo);
                processoNovo.enderecoRam = processoAntigo.enderecoRam;
                processoAntigo.enderecoRam = -1;
                break;
            }
        }
        return this._ram;
    }

    atualizaRam(t){//Adiciona no fim da fila todos os processos que chegam no tempo t (na ordem em que aparecem no array de processos)
        let processosVerdes = [];
        for(let i=0;i<this._processos.length;i++){
            if(this._processos[i].tempoChegada===t) this.entra(this._processos[i]);
            else processosVerdes.push(this._processos[i]);
        }
        this._processos = processosVerdes;
    }

    get estadoRam() {
        return this._ram;
    }
}