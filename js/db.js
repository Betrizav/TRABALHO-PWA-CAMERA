import { openDB } from "idb";

let db;

async function createDB() {
  try{
    db = await openDB('banco', 1, {
        upgrade ( db, oldVersion, newVersion, transaction){
            switch (oldVersion) {
                case 0:
                case 1:
                    const store = db.createObjectStore('pessoas', {
                        keyPath: 'nome'
                    });
                    store.createIndex('id', 'id');
                    showResult("Banco de dados criado!");
            }
        }
    });
    showResult("Banco de dados aberto.");
  } catch (e) {
    showResult("Erro ao criar o banco de dados:" + e.massage)
  }
}

window.addEventListener('DOMContentLoaded', async event =>{
  criarDB();
  document.getElementById('camera').addEventListener('click', cadastrarFlor);
  document.getElementById('listar').addEventListener('click', buscarFlor);
  document.getElementById('deletar').addEventListener('click', deletarFlor)
});

async function buscarFlor(){
  if(db == undefined){
    console.log("deu erro");
  }
  const tx = await db.transaction('foto', 'readonly');
    const store = await tx.objectStore('foto');
    const anotacoes = await store.getAll();
    if(anotacoes){
        const divLista = anotacoes.map(foto => {
            return `<div class="item">
                    <p>Anotação</p>
                    <p>${foto.nome} - ${foto.camera} </p>
                   </div>`;
        });
        listagem(divLista.join(' '));
  }
}

async function cadastrarFlor () {
  let camera = document.getElementById("camera").Value;
  let nome = document.getElementById("nome").Value;
  const tx = await db.transaction('foto', 'readwrite')
  const store = tx.objectStore('foto');
  try {
    await store.add({camera: camera, nome: nome});
    await tx.done;
    limparCampos();
  }
}