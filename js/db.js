import { openDB } from "idb";

let db;

async function createDB() {
  try{
    db = await openDB('banco', 1,) {
        upgrade ( db, oldVersion, newVersion, transaction){
            switch (oldVersion) {
                case 0:
                case 1:
                    const
            }
        }
    }
  }

}

