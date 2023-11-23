import Process from './Process.js';
import {Simulacao, Algoritmo, Tabela} from './Simulacao.js';
import './App.css';
import Grafico from './grafico/tabela.js';
import IdentificadorCol from './grafico/grafico.js';
import Processos from './interface/processos.js';
import './grafico/grafico.css';
import './interface/form.css';

function App() {
  let colunaA = [Tabela.ACHEGAR, Tabela.EXECUTANDO, Tabela.ESPERANDO, Tabela.FINALIZADO, Tabela.SOBRECARGA, Tabela.EXECUTANDO_DL, Tabela.ESPERANDO_DL, Tabela.FINALIZADO_DL];
  let sim = new Simulacao(Algoritmo.EDF, [new Process(0,2,4,10), new Process(1,0,3,6), new Process(2,1,2,4), new Process(3,3,1,7)],2,2);
  let i = 0;
  while(!sim.terminou()&&i<50){
    sim.transicao();
    i++;
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='Caixa'>
          <p className='Titulo'>Adicionar processo</p>
          <form className='Formulario'>
            <label className='Rotulo'>Tempo de chegada: </label>
            <input className='Input' type='number' id='chegada' name='chegada' min='0' step='1'/>
            <label className='Rotulo'>Tempo de execução: </label>
            <input className='Input' type='number' id='execucao' name='execucao' min='1' step='1'/>
            <label className='Rotulo'>Deadline: </label>
            <input className='Input' type='number' id='deadline' name='deadline' min='0' step='1'/>
            <button className='Adicionar' type='submit'>Adicionar</button>
          </form>
        </div>
        <Processos lista={[
          { id: 0, tempochegada: 2, tempoexecucao: 4, deadline: 10 },
          { id: 1, tempochegada: 0, tempoexecucao: 3, deadline: 6 },
          { id: 2, tempochegada: 1, tempoexecucao: 2, deadline: 4 },
          { id: 3, tempochegada: 3, tempoexecucao: 1, deadline: 7 }
        ]}/>
        <div className='Gannt'>
          <IdentificadorCol processosnum={sim.processos.length}/>
          <Grafico colunas={sim.colunas} />
        </div>
      </header>
    </div>
  );
}

export default App;
