import Process from './Process.js';
import {Simulacao, Algoritmo, Tabela} from './Simulacao.js';
import './App.css';
import Grafico from './debug/teste.js';

function App() {
  let colunaA = [Tabela.ACHEGAR, Tabela.EXECUTANDO, Tabela.ESPERANDO, Tabela.FINALIZADO, Tabela.SOBRECARGA, Tabela.EXECUTANDO_DL, Tabela.ESPERANDO_DL, Tabela.FINALIZADO_DL];
  let sim = new Simulacao(Algoritmo.RR, [new Process(0,2,4), new Process(1,0,3), new Process(2,1,2), new Process(3,3,1)]);
  let i = 0;
  while(!sim.terminou()&&i<20){
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
