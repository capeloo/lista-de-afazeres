import { Component, OnInit } from '@angular/core';
import { ListaDeTarefasService } from './lista-de-tarefas.service';
import { Tarefas } from './tarefas';

@Component({
  selector: 'app-lista-de-tarefas',
  templateUrl: './lista-de-tarefas.page.html',
  styleUrls: ['./lista-de-tarefas.page.scss'],
})
export class ListaDeTarefasPage implements OnInit {
  tarefas: Tarefas[];
  tarefa: Tarefas;
  isTarefaFormOpen: boolean = false;

  constructor(private ListaDeTarefasService: ListaDeTarefasService) { }

  ngOnInit() {
    this.ListaDeTarefasService.initDB();
    this.ListaDeTarefasService.getAll().then((tarefas: Tarefas[]) => {
      this.tarefas = tarefas;
      console.log(this.tarefas);
    }).catch((err: any) => {
      console.log(err);
    });
  }

  onSaveTarefa() {
    if(!this.tarefa._id) {
      this.ListaDeTarefasService.save(this.tarefa).then(() => {
        this.isTarefaFormOpen = false;
      }).catch((err: any) => {
        console.log(err);
      });
    } else {
      this.ListaDeTarefasService.update(this.tarefa).then(() => {
        this.isTarefaFormOpen = false;
      }).catch((err: any) => {
        console.log(err);
      });
    }
  }

  onOpenTarefaForm(){
    this.tarefa = {
      _id: '',
      name: ''
    };

    this.isTarefaFormOpen = true;
  }

  onEditItem(tarefa: Tarefas) {
    this.tarefa = tarefa;
    this.isTarefaFormOpen = true;
  }

  onRemoveItem() {
    this.ListaDeTarefasService.remove(this.tarefa);
    this.isTarefaFormOpen = false;
  }
}
