import Process from './Process.js';
import {Simulacao, Algoritmo, Tabela} from './Simulacao.js';
import {AlgoritmoMemoria} from './memoria/Ram.js';
import './App.css';
import Grafico from './grafico/tabela.js';
import IdentificadorCol from './grafico/grafico.js';
import './grafico/grafico.css';
import Disco from './memoria/Disco.js'
import Ram from './memoria/Ram.js'
import Virtual from './memoria/Virtual.js'

function App() {
  let colunaA = [Tabela.ACHEGAR, Tabela.EXECUTANDO, Tabela.ESPERANDO, Tabela.FINALIZADO, Tabela.SOBRECARGA, Tabela.EXECUTANDO_DL, Tabela.ESPERANDO_DL, Tabela.FINALIZADO_DL];
  let processos = [new Process(0,2,4,10,1), new Process(1,0,3,6,1), new Process(2,1,2,4,1), new Process(3,3,1,7,1)];
  let sim = new Simulacao(Algoritmo.EDF, processos,2,2);
  let disco = new Disco(processos);
  let ram = new Ram(processos, AlgoritmoMemoria.FIFO);
  let virtual = new Virtual(processos);
  let i = 0;
  while(!sim.terminou()&&i<50){
    sim.transicao();
    disco.atualizaDisco(i);
    ram.atualizaRam(i);
    virtual.atualizaVirtual();
    i++;
  }
  // console.log('Disco: ' + disco.processos.fila);
  console.log('RAM: ' + ram.estadoRam);
  return (
    <div className="App">
      <header className="App-header">
        <div className='Gannt'>
          <IdentificadorCol processosnum={sim.processos.length}/>
          <Grafico colunas={sim.colunas}/>
        </div>
      </header>
    </div>
  );
}

export default App;
