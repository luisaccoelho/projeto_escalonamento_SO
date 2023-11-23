import './grafico.css'
import Grafico from './grafico.js'
import {Simulacao} from '../Simulacao.js'

export default function IdentificadorCol({processosnum}){
    let identificadores = [];
    for(let i=0; i<processosnum; i++){
        identificadores.push("Processo "+i);
    }
    return (
        <div className='IDColuna'>
            {identificadores.map((i, index) => (
                <div className='ID' key={index}>{i}</div>
            ))}
        </div>
    );
}