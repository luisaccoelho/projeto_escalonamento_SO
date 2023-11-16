import React from 'react';
import Tabela from '../Simulacao.js'
import './colunaTeste.css';

function Quadrado(estado){
    let codigo = estado.estado;
    switch(codigo){
        case 1:
            return <div className='EXECUTANDO'></div>;
        case 2:
            return <div className='ESPERANDO'></div>;
        case 4:
            return <div className='SOBRECARGA'></div>;
        case 0:
            return <div className='ACHEGAR'></div>;
        case 3:
            return <div className='FINALIZADO'></div>;
        case 5:
            return <div className='EXECUTANDO_DL'></div>;
        case 6:
            return <div className='ESPERANDO_DL'></div>;
        case 7:
            return <div className='FINALIZADO_DL'></div>;
        default:
            console.log(estado.estado);
            return <p>ERRO</p>;
    }
}

function Coluna({coluna}) {
  return (
    <div className='Coluna'>{coluna.map((estado) => <Quadrado estado = {estado}/>)}</div>
  );
}

export default Coluna;
