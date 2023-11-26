import React from "react";
import Ram from "../Ram";
import Process from "../../Processo";

function Linha(processo){
    console.log(JSON.stringify(processo));
    return <div>Processo {processo.processo.id}</div>
}

function RamVisualizacao({ram}){ //Recebe a RAM da simulação e acessa o estado atual dela
    console.log('Estado da RAM da Simulação: ' + ram.ram);
    console.log('Tipo do estado atual da RAM: ' + typeof ram.ram);
    console.log('Tipo do do que tem dentro da RAM: ' + ram.ram[0]);
    return (
        <div className="Caixa">
            <p className="Title">RAM</p>
            {ram.ram.map((processo, index) => (
                <Linha key={index} processo={processo}/>
            ))}
        </div>
    );
}

export default RamVisualizacao;