import "./virtualDois.css"
import "./memoria.css"

function processosEndereco({ram}){
    let virtual = [];
    let end = 0;
    for (let i=0; i<ram.length;i++){
        virtual.push({endereco: end, processo: ram[i].id});
        end += ram[i].tamanho;
    }
    return virtual;
}

function ProcessoVirtual({indice, endereco}){
    return(
        <div>
            <p>Processo {indice} está em: {endereco}</p>
        </div>
    )
}

export default function virtualAlt({ram}){
    let virtual = processosEndereco(ram);
    return(
        <div className="VirtualDois">
            <p>Memória Virtual</p>
            <div className="ProcessoMemoria">
                {virtual.map((endereco, index) => (
                    <ProcessoVirtual key={index} indice={endereco.processo} endereco={endereco.endereco}/>
                ))}
            </div>
        </div>
    )
}