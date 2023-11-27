import Process from './Processo.js';
import {Simulacao, Algoritmo, Tabela} from './Simulacao.js';
import { MemoAlgoritmo } from './memoria/Ram.js';
import './App.css';
import Grafico from './grafico/tabela.js';
import IdentificadorCol from './grafico/grafico.js';
import Processos from './interface/processos.js';
import './grafico/grafico.css';
import './interface/form.css';
import { useState } from 'react';
import Disco from './memoria/Disco.js';
import Ram from './memoria/Ram.js';
import Virtual from './memoria/Virtual.js';
import Turnaround from './interface/turnaround.js';
import RamVisualizacao from './memoria/visualização/ramVisualizacao.js';
import DiscoVisualizacao from './memoria/visualização/discoVisualizacao.js';
import RamAlternativa from './memoria/visualização/ramAlternativa.js';
import VirtualAlt from './memoria/visualização/virtualDois.js';
import VirtualVisualizacao from './memoria/visualização/virtualVisualizacao.js';

function atualizar(variavel,funcao){//Função que atualiza o estado de uma variável booleana para engatilhar re-renderização da página
  funcao(!variavel);
}

function App() {
  const [processos, setProcessos] = useState([]);
  const [update, setUpdate] = useState(false);
  const [sim, setSim] = useState(new Simulacao());//processos,quantum,sobrecarga,algoritmo,disco,ram,virtual
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
    const memoAlgoritmoString = document.getElementById('memoAlgoritmo').value;
    let algoritmo = 0;
    let memoAlgoritmo = 0;
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
    switch(memoAlgoritmoString){
      case 'FIFO':
        memoAlgoritmo = MemoAlgoritmo.FIFO;
        break;
      case 'MRU':
        memoAlgoritmo = MemoAlgoritmo.MRU;
        break;
      default:
        throw new Error('Algoritmo da memória não reconhecido');
        break;
    }
    let processosSim = [];
    for(let i = 0; i<processos.length; i++){
      processosSim.push(new Process(processos[i].id,processos[i].tempochegada,processos[i].tempoexecucao,processos[i].deadline,processos[i].tamanho));
    }
    const disco = new Disco(processosSim);
    const ram = new Ram(processosSim, memoAlgoritmo);
    const virtual = new Virtual(processosSim);
    const simula = new Simulacao(algoritmo, processosSim, sobrecarga, quantum, disco, ram, virtual);
    setSim(simula);
  }
  
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
            <input className='Input' type='number' id='tamanho' name='tamanho' placeholder='1' min='1' max='10' step='1'/>
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
            <label className='Rotulo'>Algoritmo da Memória: </label>
            <select className='Escolha' id='memoAlgoritmo'>
              <option value="FIFO">FIFO</option>
              <option value="MRU">MRU</option>
            </select>
            <button className='Adicionar' type='submit'>Iniciar</button>
          </form>
        </div>
        <div className='Gannt'>
          <IdentificadorCol processosnum={sim.processos.length}/>
          <Grafico colunas={sim.colunas} />
        </div>
        <Turnaround turnaround={sim.turnaroundMedio} finalizado={sim.terminou()}/>
        <div className='Controles'>
          <button className='Controle' onClick={avancaCiclo}>Avançar um ciclo</button>
          <button className='Controle' onClick={finalizaSim}>Avançar até o final da simulação</button>
        </div>
        <div className='Memoria'>
          <DiscoVisualizacao disco={sim.disco}/>
          <RamVisualizacao ram={sim.ram}/>
          <RamAlternativa ram={sim.ram}/>
          <VirtualAlt ram={sim.ram}/>
        </div>
        <p className='Nomes'>Feito por <a className='Ancora' href='https://github.com/KukoBerry'>João Silva Soares</a>, <a className='Ancora' href='https://github.com/LucasTBorges'>Lucas Teixeira Borges</a> e <a className='Ancora' href='https://github.com/luisaccoelho'>Luísa Coutinho Coelho</a></p>
      </header>
    </div>
  );
}

export default App;
