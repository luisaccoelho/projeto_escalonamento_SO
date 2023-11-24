import Process from "../Process";
import Fila from "../Fila";

export default class Disco {
    constructor(processos=[]){
        this._processos = new Fila(processos);
    }

    atualizaDisco(t){
        this._processos.chegam(t);
    }

    get processos(){
        return this._processos;
    }
}