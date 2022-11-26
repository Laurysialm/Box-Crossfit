const indexdDB =
window.indexedDB ||
window.mozIndexdDB ||
window.webkitIndexdDB ||
window.msIndexdDB ||
window.shimIndexdDB;

const request = indexdDB.open("CrossDatabase",1);

request.onerror = function (event) {
    console.error("Erro ao conectar com o banco de dados");
    console.error(event);
};

request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("alunos", {keyPath: "id"});
    store.createIndex("nomeAluno",["aluno"], {unique: false});
    store.createIndex("emailrAluno",["email", "aluno"],{
        unique: false,
    });
};

request.onsuccess = function () {
    const db = request.result;
    const transaction = db.transaction("alunos", "readwrite");

    const store = transaction.objectStore("alunos");
    const nome = store.index("nomeAluno");
    const email = store.index("emailAluno");

    store.put({ id: 1, nome: "João", email: "joao15@gmail.com"});
    store.put({ id: 2, nome: "Maria", email: "maria45@gmail.com"});
    store.put({ id: 3, nome: "Teo", email: "teo13@gmail.com"});
    store.put({ id: 4, nome: "Paulo", email: "paulinho145@gmail.com"});
    store.put({ id: 5, nome: "Pedro", email: "jpedrao123@gmail.com"});
    store.put({ id: 6, nome: "Joana", email: "jo789@gmail.com"});

    const idQuery =  store.get(6);
}

