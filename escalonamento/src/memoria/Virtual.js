import Process from "../Process";

function compare(processo1, processo2){
    return processo1.id-processo2.id;
}

export default class Virtual {
    constructor(processos=[]){
        this._processos = processos;
        this._enderecos = {};
    }

    atualizaVirtual(){
        for (let i=0; i<this._processos.length;i++){
            this._enderecos[this._processos[i].id] = this._processos[i].enderrecoRam;
        }
    }
}