export const MemoAlgoritmo = {
    FIFO: 1,
    MRU: 2
};

export default class Ram{
    constructor(processos=[],algoritmo=MemoAlgoritmo.FIFO,t=0){//O t é o tempo atual da simulação
        this._processos = processos;//Todos os processos que ainda não chegaram
        this._algoritmo = algoritmo;
        this._ram = [];//Estado atual da RAM
        this._tamanho=200000;
        this._ocupado=0;
        this._livre=200000;
    }

    entra(processo){//Adiciona um processo na RAM, caso não haja espaço sobrescreve de acordo com o algoritmo em vigor
        if(this._ram.includes(processo)) return this._ram;
        if(this._livre >= processo.tamanho*4000) {//Um processo só é adicionado caso haja espaço para todas as suas páginas
            this._ram.push(processo); //Se há espaço, apenas coloca o processo no final da fila
            processo.enderecoRam = this._ram.length-1;
            this._ocupado += processo.tamanho*4000;
            this._livre = this._tamanho - this._ocupado;
        } else {
            switch (this._algoritmo){
                case MemoAlgoritmo.FIFO:
                    let primeiro = this._ram[0]
                    for(let i=0;i<this._ram.length;i++){
                        if(this._ram[i].tempoChegada<primeiro.tempoChegada){
                            primeiro = this._ram[i];
                        }
                    }
                    this.substitui(primeiro, processo);//Tira o processo que entrou há mais tempo (o primeiro da fila)
                    return this._ram;
                case MemoAlgoritmo.MRU:
                    let menosRecentementeUtilizado = this._ram[0];
                    for(let i=0;i<this._ram.length;i++){
                        if(this._ram[i].ultimaChamada<menosRecentementeUtilizado.ultimaChamada){ //Procura o processo chamado a menos tempo
                            menosRecentementeUtilizado = this._ram[i];
                        }
                    }
                    this.substitui(menosRecentementeUtilizado, processo); //Retira o processo utilizado a menos tempo
                    return this._ram;
                default:
                    break;
                    // throw new Error('Algoritmo da Memória não reconhecido');
            }
        }
        return this._ram;
    }

    substitui(processoAntigo, processoNovo){//Substitui um processo por outro na RAM
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

    get ram() {
        return this._ram;
    }
}