import Process from './Process.js';
import Fila from './Fila.js';

export default class Estado {
    constructor(processos = [],fila = new Fila(),tempo=0, executando=null, sobrecarga=0, quantum=0){
        this._processos = processos;//Array de processos. Por padrão inicia em []
        this._fila = fila;//Fila de processos, utilizada exclusivamente no FIFO e Round Robin. Por padrão inicia vazia.
        this._tempo = tempo;//Tempo atual da simulação. Por padrão inicia em t=0.
        this._executando = executando;//Processo que está sendo executado no momento. Por padrão inicia como null (assim será também durante a sobrecarga).
        this._sobrecarga = sobrecarga;//Tempo de sobrecarga RESTANTE (não confundir com a duração total de sobrecarga). Por padrão inicia em 0.
        this._quantum = quantum;//Quantum RESTANTE (não confundir com a duração total do quantum). Por padrão inicia em 0.
    }

    getProcessosAtivos(){//Retorna um array com os processos que já chegaram e ainda não terminaram sua execução
        const processosAtivos = [];
        for(let i=0;i<this._processos.length;i++){
            if(!this._processos[i].terminou && this._processos[i].jaChegou(this._tempo)){
                processosAtivos.push(this._processos[i]);
            }
        }
        return processosAtivos;
    }

    transicaoSJF(){//Executa um ciclo da simulação utilizando o algoritmo SJF
        if (this._executando != null){//Se existe um processo sendo executado, executa um ciclo de processamento
            this._executando.incrementaElapsedTime();
            if(this._executando.terminou){//Se o processo terminou, libera o processador
                this._executando = null;
            }
        }
        else{//Se não há um processo sendo executado, verifica se há algum processo apto a ser escalonado
            const processosAtivos = this.getProcessosAtivos();
            if(processosAtivos.length>0){//Se existe ao menos um processo ativo, escalona o processo com o menor tempo de de execução
                let shortestJob = processosAtivos[0];
                for(let i=1;i<processosAtivos.length;i++){//Busca o processo com o menor tempo de execução
                    if(processosAtivos[i].tempExec < shortestJob.tempExec){
                        shortestJob = processosAtivos[i];
                    }
                }
                this._executando = shortestJob;//Escalona o processo com o menor tempo de execução
                this._executando.incrementaElapsedTime();//Executa um ciclo de processamento
                if(this._executando.terminou){//Se o processo terminou, libera o processador
                    this._executando = null;
                }
            }
        }
        this._tempo++;//Incrementa o tempo da simulação
    }
}