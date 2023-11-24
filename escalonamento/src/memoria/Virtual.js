import Process from "../Process";

export default class Virtual {
    constructor(processos=[]){
        this._processos = processos;
        this._enderecos = {};
    }

    atualizaVirtual(){
        for (let i=0; i<this._processos.length;i++){
            if (this._processos[i].id != -1){
                this._enderecos[this._processos[i].id] = this._processos[i].enderrecoRam;
            }
        }
        Object.entries(this._enderecos).sort((a,b) => a[0]-b[0]);
    }

    
}