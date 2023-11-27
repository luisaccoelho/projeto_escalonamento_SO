import Process from './Processo.js';
import Fila from './Fila.js';

export default class Estado {
    constructor(processos = [],fila = null,tempo=0, executando=null, sobrecarga=0, quantum=0){
        this._processos = processos;//Array de processos. Por padrão inicia em []
        this._fila = fila;//Fila de processos, utilizada exclusivamente no FIFO e Round Robin. Por padrão inicia vazia.
        this._tempo = tempo;//Tempo atual da simulação. Por padrão inicia em t=0.
        this._executando = executando;//Processo que está sendo executado no momento. Por padrão inicia como null (assim será também durante a sobrecarga).
        this._sobrecarga = sobrecarga;//Tempo de sobrecarga RESTANTE (não confundir com a duração total de sobrecarga). Por padrão inicia em 0.
        this._quantum = quantum;//Quantum RESTANTE (não confundir com a duração total do quantum). Por padrão inicia em 0.
        if (this._fila === null){//Se a fila não foi passada como parâmetro, cria uma nova fila utilizando a lista de processos
            this._fila = new Fila(this._processos);
        }
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

    transicaoSJF(){//Executa um ciclo da simulação utilizando o algoritmo SJF. Retorna 0 se não tinha nenhum processo apto para execução ou o processo executado se houve algum.
        let execucao = 0;
        if (this._executando != null){//Se existe um processo sendo executado, executa um ciclo de processamento
            this._executando.incrementaElapsedTime();
            execucao = this._executando;
            if(this._executando.terminou){//Se o processo terminou, libera o processador
                this._executando = null;
            }
        }
        else{//Se não há um processo sendo executado, verifica se há algum processo apto a ser escalonado
            const processosAtivos = this.getProcessosAtivos();
            if(processosAtivos.length>0){//Se existe ao menos um processo ativo, escalona o processo com o menor tempo de de execução e executa um ciclo de processamento
                let shortestJob = processosAtivos[0];
                for(let i=1;i<processosAtivos.length;i++){//Busca o processo com o menor tempo de execução
                    if(processosAtivos[i].tempExec < shortestJob.tempExec){
                        shortestJob = processosAtivos[i];
                    }
                }
                this._executando = shortestJob;//Escalona o processo com o menor tempo de execução
                this._executando.incrementaElapsedTime();//Executa um ciclo de processamento
                execucao = this._executando
                if(this._executando.terminou){//Se o processo terminou, libera o processador
                    this._executando = null;
                }
            }
        }
        let processoIter = null;
        for(let i=0;i<this._processos.length;i++){//Incrementa o tempo de espera de todos os processos que já chegaram e ainda não terminaram
            processoIter = this._processos[i];
            if(!processoIter.terminou && processoIter.jaChegou(this._tempo)){
                processoIter.incrementaTempoEspera();
            } else {
                if(processoIter.terminou && processoIter===execucao) {
                    processoIter.incrementaTempoEspera();
                }
            }
        }
        this._tempo++;//Incrementa o tempo da simulação
        return execucao;//Retorna o processo executado ou 0 se não houve nenhum
    }

    transicaoFIFO(){//Executa um ciclo da simulação utilizando o algoritmo FIFO, retorna o processo executado ou 0 se não houve nenhum
        let execucao = 0;
        this._fila.chegam(this._tempo);//Adiciona na fila todos os processos que chegam no tempo atual
        if(this._executando != null){//Se existe um processo sendo executado, executa um ciclo de processamento
            this._executando.incrementaElapsedTime();
            execucao = this._executando;
            if(this._executando.terminou){//Se o processo terminou, libera o processador
                this._executando = null;
            }
        }
        else{//Se não há um processo sendo executado, verifica se há algum processo apto a ser escalonado
            if (this._fila.primeiro != null){//Verifica se a fila não está vazia
                this._executando = this._fila.sai();//Se a fila não está vazia, remove o primeiro processo e o escalona
                this._executando.incrementaElapsedTime();//Executa um ciclo de processamento
                execucao = this._executando;
                if(this._executando.terminou){//Se o processo terminou, libera o processador
                    this._executando = null;
                }
            }
        }
        let processoIter = null;
        for(let i=0;i<this._processos.length;i++){//Incrementa o tempo de espera de todos os processos que já chegaram e ainda não terminaram
            processoIter = this._processos[i];
            if(!processoIter.terminou && processoIter.jaChegou(this._tempo)){
                processoIter.incrementaTempoEspera();
            } else {
                if(processoIter.terminou && processoIter===execucao) {
                    processoIter.incrementaTempoEspera();
                }
            }
        }
        this._tempo++;//Incrementa o tempo da simulação
        return execucao;//Retorna o processo executado ou 0 se não houve nenhum
    }

    transicaoRoundRobin(tamQuantum=0, tamSobrecarga=0)  // recebe os tamanhos totais do quantum e da sobrecarga. Retorna -1 se estava em sobrecarga, 0 se não tinha nenhum processo apto para execução ou o processo executado se houve algum.
    {
        let execucao = 0;
        this._fila.chegam(this._tempo);//Adiciona na fila todos os processos que chegam no tempo atual
        if(this._sobrecarga > 0){
            this._sobrecarga--; // decrementa o tempo de sobrecarga se houver
            execucao = -1;
        } else
        {
            if(this._executando != null){//Se existe um processo sendo executado, executa um ciclo de processamento
                this._executando.incrementaElapsedTime();
                execucao = this._executando;//Armazena o processo executado
                this._quantum--; // decrementa o tempo do quantum
                if(this._executando.terminou){//Se o processo terminou, libera o processador
                    this._executando = null;
                }else{
                    if(this._quantum === 0) // não terminou e acabou o tempo do quantum
                    {
                        this._sobrecarga = tamSobrecarga;
                        this._fila.entra(this._executando); // coloca o processo no final da fila
                        this._executando = null;
                    }
                }

            }else{//Se não há um processo sendo executado, verifica se há algum processo apto a ser escalonado

                if (this._fila.primeiro != null){//Verifica se a fila não está vazia
                    this._executando = this._fila.sai();//Se a fila não está vazia, remove o primeiro processo e o escalona
                    this._quantum = tamQuantum; // reinicia o quantum
                    this._executando.incrementaElapsedTime();//Executa um ciclo de processamento
                    execucao = this._executando;//Armazena o processo executado
                    this._quantum--; // decrementa o tempo do quantum
                    if(this._executando.terminou){//Se o processo terminou, libera o processador
                        this._executando = null;
                    }
                    else{// se não terminou, verifica se deve sofrer sobrecarga
                        if(this._quantum === 0) // não terminou e acabou o tempo do quantum (no caso de tamQuantum = 1)
                        {
                            this._sobrecarga = tamSobrecarga;
                            this._fila.entra(this._executando); // coloca o processo no final da fila
                            this._executando = null;
                        }
                    }
                }
            }
        }
        let processoIter = null;
        for(let i=0;i<this._processos.length;i++){//Incrementa o tempo de espera de todos os processos que já chegaram e ainda não terminaram
            processoIter = this._processos[i];
            if(!processoIter.terminou && processoIter.jaChegou(this._tempo)){
                processoIter.incrementaTempoEspera();
            } else {
                if(processoIter.terminou && processoIter===execucao) {
                    processoIter.incrementaTempoEspera();
                }
            }
        }
        this._tempo++;//Incrementa o tempo da simulação
        return execucao;//Retorna o processo executado, 0 se não houve nenhum, ou -1 se estava em sobrecarga
    }

    transicaoEDF(tamQuantum=0, tamSobrecarga=0){ //Executa um ciclo da simulação baseado no algoritmo EDF 
        let execucao = 0;
        if (this._sobrecarga>0){//Se estiver em sobrecarga, decrementa o tempo de sobrecarga e finaliza a transição
            this._sobrecarga--;
            execucao = -1;
        }
        else
        {//Se não estiver em sobrecarga, tenta executar um ciclo de processamento
            if(this._executando != null){
                this._executando.incrementaElapsedTime();
                execucao = this._executando;//Armazena o processo executado
                this._quantum--; // decrementa o tempo do quantum
                if(this._executando.terminou){//Se o processo terminou, libera o processador
                    this._executando = null;
                }
                else{
                    if(this._quantum === 0) // Se o processo não terminou e acabou o tempo do quantum, preempta o processo
                    {
                        this._sobrecarga = tamSobrecarga;
                        this._executando = null;
                    }
                }
            }
            else{//Se não há um processo sendo executado, verifica se há algum processo apto a ser escalonado e o escalona
                const processosAtivos = this.getProcessosAtivos();
                if(processosAtivos.length>0){//Se existe um processo apto, o escalona e executa um ciclo de processamento
                    let menorDL = processosAtivos[0];
                    for(let i=1;i<processosAtivos.length;i++){//Busca o processo com o menor deadline
                        if(processosAtivos[i].deadline < menorDL.deadline){
                            menorDL = processosAtivos[i];
                        }
                    }
                    this._executando = menorDL;//Escalona o processo com o menor deadline
                    this._executando.incrementaElapsedTime();//Executa um ciclo de processamento
                    execucao = this._executando;//Armazena o processo executado
                    this._quantum = tamQuantum-1; //Reseta o tempo do quantum e decrementa em 1 (em função do ciclo de processamento executado)
                    if(this._executando.terminou){//Se o processo terminou, libera o processador
                        this._executando = null;
                    }
                    else{
                        if(this._quantum === 0) // Se o processo não terminou e acabou o tempo do quantum, preempta o processo
                        {
                            this._sobrecarga = tamSobrecarga;
                            this._executando = null;
                        }
                    }
                }
            }
        }
        let processoIter = null;
        for(let i=0;i<this._processos.length;i++){//Incrementa o tempo de espera de todos os processos que já chegaram e ainda não terminaram
            processoIter = this._processos[i];
            if(!processoIter.terminou && processoIter.jaChegou(this._tempo)){
                processoIter.incrementaTempoEspera(this._tempo,true);
            } else {
                if(processoIter.terminou && processoIter===execucao) {
                    processoIter.incrementaTempoEspera(this._tempo,true);
                }
            }
        }
        this._tempo++;//Incrementa o tempo da simulação
        return execucao;//Retorna o processo executado, 0 se não houve nenhum ou -1 se estava em sobrecarga
    }

    get emSobrecarga(){//Retorna se a CPU está em sobrecarga ou não
        return this._sobrecarga > 0;
    }

    get processos(){
        return this._processos;
    }

    set processos(processos){
        this._processos = processos;
    }

    get fila(){
        return this._fila;
    }

    set fila(fila){
        this._fila = fila;
    }

    get tempo(){
        return this._tempo;
    }

    set tempo(tempo){
        this._tempo = tempo;
    }

    get executando(){
        return this._executando;
    }

    set executando(executando){
        this._executando = executando;
    }

    get sobrecarga(){
        return this._sobrecarga;
    }

    set sobrecarga(sobrecarga){
        this._sobrecarga = sobrecarga;
    }

    get quantum(){
        return this._quantum;
    }

    set quantum(quantum){
        this._quantum = quantum;
    }

}