import './processos.css';

function ProcessoBox({processo}){
    return (
        <div className='Processo'>
            <p className='Nome'>Processo {processo.id}</p>
            <p className='Atributo'>Tempo de Chegada: {processo.tempochegada}</p>
            <p className='Atributo'>Tempo de Execução: {processo.tempoexecucao}</p>
            <p className='Atributo'>Deadline: {processo.deadline}</p>
        </div>
    )
}

export default function Processos({lista}){
    return (
        <div className='Processos'>
            {lista.map((processo) => (
                <ProcessoBox processo={processo} />
            ))}
        </div>
    )
}