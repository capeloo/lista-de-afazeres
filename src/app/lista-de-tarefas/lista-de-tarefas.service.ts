import { Injectable } from '@angular/core';
import { Tarefas } from './tarefas';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class ListaDeTarefasService {
  localDB: any;
  tarefas: Tarefas[];

  constructor() { }

  initDB() {
    this.localDB = new PouchDB('tarefas');

    const remoteDB = new PouchDB('https://database-production-1494.up.railway.app/tarefas', {
      fetch: (url: string | Request, opts: any) => {
        const login = "admin";
        const password = "hrmkXLbUApuA";
        const token = btoa(login + ":" + password);
        opts.headers.set('Authorization', 'Basic ' + token);
        return PouchDB.fetch(url, opts);
      }
    });

    this.localDB.sync(remoteDB, {
      live: true,
      retry: false
    });
  }

  private findIndex(id: string) {
    const tarefasIndex = this.tarefas.findIndex(tarefas => tarefas._id === id);
    return tarefasIndex;
  }

  private onDatabaseChange = (change: any) => {
    const index = this.findIndex(change.id);
    const tarefas = this.tarefas[index];
    if(change.deleted) {
      if(tarefas) {
        this.tarefas.splice(index, 1);
      }
    } else {
      if(tarefas && tarefas._id === change.id) {
        this.tarefas[index] = change.doc;
      } else {
        this.tarefas.splice(index, 0, change.doc);
      }
    }
  }

  getAll(){
    if(!this.tarefas) {
      return this.localDB.allDocs({include_docs: true}).then((docs: {rows: []}) => {
        this.tarefas = docs.rows.map((row: {doc?: any}) => row.doc);
        this.localDB.changes({live: true, since: 'now', include_docs: true}).on('change', this.onDatabaseChange);
        return this.tarefas;
      })
    } else {
      return Promise.resolve(this.tarefas);
    }
  }

  save(tarefas: Tarefas) {
    return this.localDB.post(tarefas);
  }

  update(tarefas: Tarefas) {
    return this.localDB.put(tarefas);
  }

  remove(tarefas: Tarefas) {
    return this.localDB.remove(tarefas);
  }
}