import React from "react";
import Ram from "../Ram";
import Process from "../../Processo";
import './memoria.css';

function LinhaRam(processo){
    return <div className="ProcessoMemoria">Processo {processo.processo.id}</div>
}

function RamVisualizacao({ram}){ //Recebe a RAM da simulação e acessa o estado atual dela
    return (
        <div className="MemoriaItem">
            <div className="Caixa">
                <p className="Title">RAM</p>
                {ram.ram.map((processo, index) => (
                    <LinhaRam key={index} processo={processo}/>
                ))}
            </div>
        </div>
    );
}

export default RamVisualizacao;