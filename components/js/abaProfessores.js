const KEY_BD = '@lauri-alunos'

// variaveis
var listaRegistros = {
    ultimoIdGerado: 0,
    clientes: []
}

// função para salvar na memoria do navegador

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


// função para criar a tabela
function desenhar() {
    const tbody = document.getElementById('listaProfBody')
    if (tbody) {
        tbody.innerHTML = listaRegistros.clientes.map(cliente => {

            return `<ol>
                        
                        <ul>${cliente.nome}</ul>
                        <ul>${cliente.genero}</ul>
                
                </ol>`

        }).join('')

    }

}
// função para inserir as informações na tabela

function insert(nome, genero) {

    listaRegistros.clientes.push({
        nome, genero,
    })
    gravarBD()
    desenhar()
}


// função para o botão salvar

function submeter(e) {
    e.preventDefault()


    let valorGenero;
    let rads = document.getElementsByName("radio-genero");

    for (var i = 0; i < rads.length; i++) {
        if (rads[i].checked) {
            valorGenero = rads[i].value;
        }

    }

    const data = {
        nome: document.getElementById('nome-prof').value,
        genero: valorGenero,



    }
    insert(data.nome, data.genero)

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
