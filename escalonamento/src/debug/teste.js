import Coluna from './colunaTeste.js';
import './teste.css';

export default function Grafico(colunas){
    if (colunas.colunas instanceof Array){
        return (
            <div className='Tabela'>{colunas.colunas.map((c, index) => <Coluna key={index} coluna={c}/>)}</div>
        );
    }
    return <p>ERRO: "colunas" não é array</p>;
}