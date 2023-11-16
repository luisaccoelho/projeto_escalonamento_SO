import logo from './logo.svg';
import Process from './Process.js';
import {Simulacao, Algoritmo, Tabela} from './Simulacao.js';
import './App.css';
import Coluna from './debug/colunaTeste.js';

function App() {
  //let colunaA = [Tabela.ACHEGAR, Tabela.EXECUTANDO, Tabela.ESPERANDO, Tabela.FINALIZADO, Tabela.SOBRECARGA, Tabela.EXECUTANDO_DL, Tabela.ESPERANDO_DL, Tabela.FINALIZADO_DL];
  let simulacao = new Simulacao(Algoritmo.RR, [new Process(0,2,4), new Process(1,0,3), new Process(2,1,2), new Process(3,3,1)]);
  let i = 0;
  while(!simulacao.terminou()&&i<100){
    simulacao.transicao();
    i++;
  }
  return (
    <div className="App">
      <header className="App-header">
        <Coluna coluna={simulacao.colunas} />
      </header>
    </div>
  );
}

export default App;
