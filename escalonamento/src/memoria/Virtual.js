import Process from "../Process";

export default class Virtual {
    constructor(processos=[]){
        this._processos = processos;
        this._enderecos = {};
    }

    atualizaVirtual(processos){
        console.log('Estado atual da Virtual: ');
        for (const [key, value] of Object.entries(this._enderecos)) {
            console.log(`${key}: ${value}`);
          }
        for (let i=0; i<processos.length;i++){
            this._enderecos[processos[i].id] = processos[i].enderecoRam;
        }
        for (let i=0; i<this._processos.length;i++){
            if (!processos.includes(this._processos[i])){
                this._enderecos[this._processos[i].id] = -1;
            }
        }
        Object.entries(this._enderecos).sort((a,b) => a[0]-b[0]);
    }

    
}