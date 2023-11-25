export default function Turnaround({turnaround, finalizado}){
    if(finalizado&&!Number.isNaN(turnaround)){//Se a simulação terminou e o turnaround não é NaN, mostra o turnaround médio
        return (
            <div className='Turnaround'>
                <p>Turnaround Médio: {turnaround}</p>
            </div>
        );
    }
    return <div></div>
}