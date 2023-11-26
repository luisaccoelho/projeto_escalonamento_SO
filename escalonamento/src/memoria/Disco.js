import Process from "../Process";
import Fila from "../Fila";

export default class Disco {
    constructor(processos=[]){
        this._processos = new Fila(processos);
    }

    atualizaDisco(t){
        this._processos.chegam(t);
        console.log('Disco: ' + this._processos.fila);
    }

    get processos(){
        return this._processos;
    }
}