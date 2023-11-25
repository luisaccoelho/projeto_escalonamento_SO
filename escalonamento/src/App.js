import Process from './Process.js';
import {Simulacao, Algoritmo, Tabela} from './Simulacao.js';
import './App.css';
import Grafico from './grafico/tabela.js';
import IdentificadorCol from './grafico/grafico.js';
import Processos from './interface/processos.js';
import './grafico/grafico.css';
import './interface/form.css';
import { useState } from 'react';

function atualizar(variavel,funcao){//Função que atualiza o estado de uma variável booleana para engatilhar re-renderização da página
  funcao(!variavel);
}

function App() {
  const [processos, setProcessos] = useState([]);
  const [update, setUpdate] = useState(false);
  const [sim, setSim] = useState(new Simulacao());//[processos,quantum,sobrecarga,algoritmo
  const atualiza = () => {
    atualizar(update,setUpdate);
  }
  const addProcesso = (e) => {//Função chamada quando um novo processo é adicionado
    e.preventDefault();
    let chegada = document.getElementById('chegada').value;
    let execucao = document.getElementById('execucao').value;
    let deadline = document.getElementById('deadline').value;
    let tamanho = document.getElementById('tamanho').value;
    if(chegada===''||chegada===null||chegada===undefined){//Se o usuário não insere os valores, valores padrão são utilizados
      chegada = 0;
    }
    if(execucao===''||execucao===null||execucao===undefined){
      execucao = 1;
    }
    if(deadline===''||deadline===null||deadline===undefined){
      deadline = 1;
    }
    if(tamanho===''||tamanho===null||tamanho===undefined){
      tamanho = 1;
    }
    const processosLista = [...processos];
    processosLista.push({id: processos.length, tempochegada: chegada, tempoexecucao: execucao, deadline: deadline, tamanho: tamanho});
    setProcessos(processosLista);
    atualiza();
  }
  const iniciarSimulacao = (e) => {//Função chamada quando uma nova simulação é iniciada, pega os valores dos inputs e inicia a simulação
    e.preventDefault();
    const quantum = document.getElementById('quantum').value;
    const sobrecarga = document.getElementById('sobrecarga').value;
    const algoritmoString = document.getElementById('algoritmo').value;
    let algoritmo = 0;
    switch(algoritmoString){
      case 'FIFO':
        algoritmo = Algoritmo.FIFO;
        break;
      case 'SJF':
        algoritmo = Algoritmo.SJF;
        break;
      case 'RR':
        algoritmo = Algoritmo.RR;
        break;
      case 'EDF':
        algoritmo = Algoritmo.EDF;
        break;
      default:
        throw new Error('Algoritmo não reconhecido');
        break;
    }
    let processosSim = [];
    for(let i = 0; i<processos.length; i++){
      processosSim.push(new Process(processos[i].id,processos[i].tempochegada,processos[i].tempoexecucao,processos[i].deadline));
    }
    const simula = new Simulacao(algoritmo, processosSim, sobrecarga, quantum);
    setSim(simula);
    //setSim(new Simulacao(Algoritmo.EDF, [new Process(0,2,4,10), new Process(1,0,3,6), new Process(2,1,2,4), new Process(3,3,1,7)],2,2));
  }
  //let colunaA = [Tabela.ACHEGAR, Tabela.EXECUTANDO, Tabela.ESPERANDO, Tabela.FINALIZADO, Tabela.SOBRECARGA, Tabela.EXECUTANDO_DL, Tabela.ESPERANDO_DL, Tabela.FINALIZADO_DL];
  //let sim = new Simulacao(Algoritmo.EDF, [new Process(0,2,4,10), new Process(1,0,3,6), new Process(2,1,2,4), new Process(3,3,1,7)],2,2);
  
  const finalizaSim = () => {//Avança até o final da simulação. Limite de 400 ciclos para evitar loops infinitos
    let i = 0;
    while(!sim.terminou()&&i<400){
      sim.transicao();
      i++;
    }
    atualiza();
  }

  const avancaCiclo = () => {//Avança um ciclo na simulação
    if(sim.terminou()){
      return;
    }
    sim.transicao();
    atualiza();
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simulador de Escalonamento de Processos</h1>
        <div className='Caixa'>
          <p className='Titulo'>Adicionar processo</p>
          <form className='Formulario'  onSubmit={addProcesso}>
            <label className='Rotulo'>Tempo de chegada: </label>
            <input className='Input' type='number' id='chegada' name='chegada' placeholder='0' min='0' step='1'/>
            <label className='Rotulo'>Tempo de execução: </label>
            <input className='Input' type='number' id='execucao' name='execucao' placeholder='1' min='1' step='1'/>
            <label className='Rotulo'>Deadline: </label>
            <input className='Input' type='number' id='deadline' name='deadline' placeholder='1' min='1' step='1'/>
            <label className='Rotulo'>Tamanho: </label>
            <input className='Input' type='number' id='tamanho' name='tamanho' placeholder='1' min='1' step='1'/>
            <button className='Adicionar' type='submit'>Adicionar</button>
          </form>
        </div>
        <Processos lista={processos}/>
        <div className='Caixa'>
        <p className='Titulo'>Iniciar nova Simulação</p>
          <form className='Formulario' onSubmit={iniciarSimulacao}>
            <label className='Rotulo'>Duração do Quantum: </label>
            <input className='Input' type='number' id='quantum' name='quantum' placeholder='1' min='1' step='1'/>
            <label className='Rotulo'>Duração da Sobrecarga: </label>
            <input className='Input' type='number' id='sobrecarga' name='sobrecarga' placeholder='0' min='0' step='1'/>
            <label className='Rotulo'>Algoritmo de Escalonamento: </label>
            <select className='Escolha' id="algoritmo">
              <option value="FIFO">FIFO</option>
              <option value="SJF">SJF</option>
              <option value="RR">RR</option>
              <option value="EDF">EDF</option>
            </select>
            <button className='Adicionar' type='submit'>Iniciar</button>
          </form>
        </div>
        <div className='Gannt'>
          <IdentificadorCol processosnum={sim.processos.length}/>
          <Grafico colunas={sim.colunas} />
        </div>
        <div className='Controles'>
          <button className='Controle' onClick={avancaCiclo}>Avançar um ciclo</button>
          <button className='Controle' onClick={finalizaSim}>Avançar até o final da simulação</button>
        </div>
        
      </header>
    </div>
  );
}

export default App;
