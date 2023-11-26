export const MemoAlgoritmo = {
    FIFO: 1,
    MRU: 2
};

export default class Ram{
    constructor(processos=[],algoritmo,t=0){//O t é o tempo atual da simulação
        this._processos = processos;//Todos os processos que ainda não chegaram
        this._algoritmo = algoritmo;
        this._ram = [];//Estado atual da RAM
        this._tamanho=20;
        this._ocupado=0;
        this._livre=20;
    }

    entra(processo){//Adiciona um processo na RAM, caso não haja espaço sobrescreve de acordo com o algoritmo em vigor
        console.log('Estado atual da RAM: ' + this._ram);   
        console.log('Espaço livre: ' + this._livre);
        console.log('Tamanho do processo: ' + processo.tamanho);
        if(this._ram.includes(processo)) return this._ram;
        if(this._livre >= processo.tamanho) {//Um processo só é adicionado caso haja espaço para todas as suas páginas
            console.log('RAM com espaço de sobra!');
            this._ram.push(processo); //Se há espaço, apenas coloca o processo no final da fila
            processo.enderecoRam = this._ram.length-1;
            this._ocupado += processo.tamanho;
            this._livre = this._tamanho - this._ocupado;
        } else {
            console.log('Sem espaço na RAM, retirando um processo...');
            switch (this._algoritmo){
                case MemoAlgoritmo.FIFO:
                    console.log('Algoritmo: FIFO');
                    let primeiro = this._ram[0]
                    for(let i=0;i<this._ram.length;i++){
                        if(this._ram[i].tempoChegada<primeiro.tempoChegada){
                            primeiro = this._ram[i];
                        }
                    }
                    this.substitui(primeiro, processo);//Tira o processo que entrou há mais tempo (o primeiro da fila)
                    return this._ram;
                case MemoAlgoritmo.MRU:
                    console.log('Algoritmo: MRU');
                    let menosRecentementeUtilizado = this._ram[0];
                    for(let i=0;i<this._ram.length;i++){
                        if(this._ram[i].ultimaChamada<menosRecentementeUtilizado.ultimaChamada){ //Procura o processo chamado a menos tempo
                            menosRecentementeUtilizado = this._ram[i];
                        }
                    }
                    console.log('Menos recentemente utilizado: ' + menosRecentementeUtilizado);
                    this.substitui(menosRecentementeUtilizado, processo); //Retira o processo utilizado a menos tempo
                    return this._ram;
                default:
                    console.log('Algoritmo não reconhecido');
                    break;
                    // throw new Error('Algoritmo da Memória não reconhecido');
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
        console.log('Estado atual da RAM: ' + this._ram);
        console.log('Processos para entrar:' + this._processos);
        let processosVerdes = [];
        for(let i=0;i<this._processos.length;i++){
            if(this._processos[i].tempoChegada===t){
                console.log(this._processos[i]);
                this.entra(this._processos[i]);
            }
            else processosVerdes.push(this._processos[i]);
        }
        this._processos = processosVerdes;
    }

    get estadoRam() {
        return this._ram;
    }
}