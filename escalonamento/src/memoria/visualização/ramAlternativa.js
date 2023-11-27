import './ramAlternativa.css'

//Função que retorna uma lista com n elementos do elemento passado como parâmetro
function mulElemento(elemento,n){
    let lista = [];
    for(let i=0;i<n;i++){
        lista.push(elemento);
    }
    return lista;
}

//Função para calcular a raíz quadrada inteira de um número
function sqrtInteira(n){
    if(n<0){
        throw new Error('Raíz de número negativo');
    }
    let i = 0;
    while(i*i<n){
        i++;
    }
    return i;
}

//Função que transformará a RAM em uma lista de páginas
function ramParaLista(ram){
    let lista = [];
    for(let i=0;i<ram.length;i++){
        lista = lista.concat(mulElemento(ram[i].id, ram[i].tamanho));
    }
    return lista;
}
//Função que tranformará a lista de páginas em uma tabela de visualização da RAM
function listaParaTabela(lista){
    let tabela = [];
    let linha = [];
    const tamanhoLinha = sqrtInteira(lista.length);
    for(let i=0;i<lista.length;i++){
        if(i%tamanhoLinha===0 && i!==0){
            tabela.push(linha);
            linha = [];
        }
        linha.push(lista[i]);
    }
    tabela.push(linha);
    return tabela;
}

function Celula({id}){
    return(
        <p className='Celula' key={id}>{id}</p>
    );
}

function TabelaRam({lista}){
    const tabela = listaParaTabela(lista);
    return(
        <div className='TabelaRam'>
            {tabela.map((linha, index) => (
                <div key={index} className='Fileira'>
                    {linha.map((id, index) => (
                        <Celula key={index} id={id}/>
                    ))}
                </div>
            ))}
        </div>
    );
}
function tamanhoLivre(ram){
    let tamanho = 0;
    for(let i=0;i<ram.ram.length;i++){
        tamanho += ram.ram[i].tamanho*4000;
    }
    return ram._tamanho-tamanho;
}
export default function RamAlternativa({ram}){
    const lista = ramParaLista(ram.ram).concat(mulElemento("",tamanhoLivre(ram)/4000));
    return(
        <div className='RamAlternativa'>
            <p className='TituloRam'>RAM (Visualização em Tabela)</p>
            <TabelaRam lista={lista}/>
        </div>
    );
}
