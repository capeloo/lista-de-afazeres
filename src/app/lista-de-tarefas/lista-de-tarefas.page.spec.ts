import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDeTarefasPage } from './lista-de-tarefas.page';

describe('ListaDeTarefasPage', () => {
  let component: ListaDeTarefasPage;
  let fixture: ComponentFixture<ListaDeTarefasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeTarefasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
