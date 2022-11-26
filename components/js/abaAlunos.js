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
    const tbody = document.getElementById('listaAlunoBody')
    if (tbody) {
        tbody.innerHTML = listaRegistros.clientes.map(cliente => {

            return `<ol>
                        
                        <ul>${cliente.nome}</ul>
                        <ul>${cliente.cpf}</ul>
                        <ul>${cliente.dataNasc}</ul>
                        <ul>${cliente.tel}</ul>
                        <ul>${cliente.email}</ul>
                        <ul>${cliente.nesc}</ul>
                        <ul>${cliente.genero}</ul>
                
                </ol>`

        }).join('')

    }

}
// função para inserir as informações na tabela

function insert(nome, cpf, dataNasc, tel, email, nesc, genero) {

    listaRegistros.clientes.push({
        nome, cpf, dataNasc, tel, email, nesc, genero,
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
        nome: document.getElementById('nome-aluno').value,
        cpf: document.getElementById('cpf-aluno').value,
        dataNasc: document.getElementById('nasc-aluno').value,
        tel: document.getElementById('tel-aluno').value,
        email: document.getElementById('email-aluno').value,
        nesc: document.getElementById('nasc-aluno').value,
        genero: valorGenero,



    }
    insert(data.nome, data.cpf, data.dataNasc, data.tel, data.email, data.nesc, data.genero)

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
