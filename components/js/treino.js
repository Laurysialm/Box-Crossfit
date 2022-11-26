
const KEY_BD = '@lauri'

// variaveis
var listaRegistros = {
    ultimoIdGerado: 0,
    clientes: []
}

//function memory save navigator
function gravarBD() {
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros))
}

function lerBD() {
    const data = localStorage.getItem(KEY_BD)
    if (data) {
        listaRegistros = JSON.parse(data)
    }
    desenhar()
}


// function create table
function desenhar() {
    const tbody = document.getElementById('listaRegistrosBody')
    if (tbody) {
        tbody.innerHTML = listaRegistros.clientes.map(cliente => {

            return `<tr>
                        <th>${cliente.dia} - ${cliente.date}</th>
                        <div style="display:flex;flex-direction:column;">${cliente.atividade}</div>
                        <th>${cliente.horaI} - ${cliente.horaF}</th>
                
                </tr>`

        }).join('')

    }

}
//function to insert the information into the table

function insert(dia, atividade, date, horaI, horaF) {

    listaRegistros.clientes.push({
        dia, atividade, date, horaI, horaF
    })
    gravarBD()
    desenhar()
    visualizar('lista')
}


// função para o botão salvar

function submeter(e) {
    e.preventDefault()

    let valor = document.querySelectorAll("#atividade-nova");

    let valores = [].map.call(valor, function (input) {
        return input.value;
    });

    const data = {
        dia: document.getElementById('option-day').value,
        atividade: valores,
        date: document.getElementById('dia-semana').value,
        horaI: document.getElementById('hora-inicio').value,
        horaF: document.getElementById('hora-fim').value,


    }
    insert(data.dia, data.atividade, data.date, data.horaI, data.horaF)

}

//função para o botao adicionar exercicio

function adicionarTreino() {
    let e = document.createElement('input')
    e.id = 'atividade-nova';
    e.style.marginTop = '5px'
    document.getElementById("box-treino").appendChild(e)


}


//função para mostrar a tabela
window.addEventListener('load', () => {
    lerBD()
    desenhar()

    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})



// função para mostrar o Modal do input da msg

function showModal() {
    var element = document.getElementById("modal");
    element.classList.add("show-modal");
}

function closeModal() {
    var element = document.getElementById("modal");
    element.classList.remove("show-modal");
}
