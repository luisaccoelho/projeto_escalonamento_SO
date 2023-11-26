export const MemoAlgoritmo = {
    FIFO: 1,
    MRU: 2
};

export default class Ram{
    constructor(processos=[],algoritmo=MemoAlgoritmo.FIFO,t=0){//O t é o tempo atual da simulação
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
                    console.log('Processo a ser retirado: ' + primeiro);
                    console.log('Processo que vai entrar: ' + processo);
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

    substitui(processoAntigo, processoNovo){//Substitui um processo por outro na RAM
        if(this._ram.length===0){//Se a fila está vazia, retorna null
            return null;
        }
        for(let i=0;i<this._ram.length;i++){
            console.log('Processo antigo: ' + processoAntigo);
            console.log('Olhando processo: ' + this._ram[i]);
            if(this._ram[i]===processoAntigo){
                this._ram.splice(i, 1, processoNovo);
                console.log('Processo novo: ' + processoNovo);
                processoNovo.enderecoRam = processoAntigo.enderecoRam;
                console.log('Endereço RAM: ' + processoNovo.enderecoRam);
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