import logo from './logo.svg';
import Process from './Process.js';
import './App.css';

function App() {
  processo1 = new Process(1, 0, 3, 3, 1, 1);
  console.log(processo1.toString());
  processo1.incrementaElapsedTime();
  console.log(processo1.toString());
  processo1.incrementaTempoEspera();
  console.log(processo1.toString());
  processo1.incrementaElapsedTime();
  console.log(processo1.getTurnaround());
  console.log(processo1.toString());
  processo1.incrementaElapsedTime();
  console.log(processo1.toString());
  console.log(processo1.getTurnaround());
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
