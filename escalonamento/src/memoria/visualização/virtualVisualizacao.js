import React from "react";
import './memoria.css';

function LinhaVirtual(endereco){
    return <div>Processo x está em: {endereco}</div>
}

function VirtualVisualizacao({virtual}){
    if(virtual.enderecos!=undefined){
        let enderecosOrdenados = virtual.enderecosArrayOrdenado;
        console.log('Tá definido!' + enderecosOrdenados);
        return (
            <div className="MemoriaItem">
                <div className="Caixa">
                    <p className="Title">Virtual</p>
                    {enderecosOrdenados.map((endereco, index) => (
                        <LinhaVirtual key={index} endereco={endereco}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default VirtualVisualizacao