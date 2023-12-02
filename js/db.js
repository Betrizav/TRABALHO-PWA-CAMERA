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
