import React from "react";
import Disco from "../Disco";
import Process from "../../Processo";
import './memoria.css';


function LinhaDisco(processo){
    return <div className="ProcessoMemoria">Processo {processo.processo.id}</div>
}

function DiscoVisualizacao({disco}){
    return(
        <div className="MemoriaItem">
            <div className="Caixa">
                <p className="Title">Disco</p>
                    {disco.processos.fila.map((processo, index) => (
                        <LinhaDisco key={index} processo={processo}/>
                    ))}
            </div>
        </div>
    )
}

export default DiscoVisualizacao