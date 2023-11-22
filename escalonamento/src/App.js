import Process from './Process.js';
import {Simulacao, Algoritmo, Tabela} from './Simulacao.js';
import './App.css';
import Grafico from './debug/teste.js';

function App() {
  let colunaA = [Tabela.ACHEGAR, Tabela.EXECUTANDO, Tabela.ESPERANDO, Tabela.FINALIZADO, Tabela.SOBRECARGA, Tabela.EXECUTANDO_DL, Tabela.ESPERANDO_DL, Tabela.FINALIZADO_DL];
  let sim = new Simulacao(Algoritmo.EDF, [new Process(0,2,4,10), new Process(1,0,3,6), new Process(2,1,2,4), new Process(3,3,1,7)],2,2);
  let i = 0;
  while(!sim.terminou()&&i<50){
    console.log(sim.estado.quantum);
    sim.transicao();
    i++;
  }
  return (
    <div className="App">
      <header className="App-header">
        <Grafico colunas={sim.colunas} />
      </header>
    </div>
  );
}

export default App;
