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
  document.getElementById('botaoCadastro').addEventListener('click', cadastrarFlor);
  document.getElementById('botaoMostrar').addEventListener('click', buscarFlor);
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
        const divLista = anotacoes.map(anotacao => {
            return `<div class="item">
                    <p>Anotação</p>
                    <p>${anotacao.titulo} - ${anotacao.data} </p>
                   </div>`;
        });
        listagem(divLista.join(' '));
  }
}
