import { TestBed } from '@angular/core/testing';

import { ListaDeTarefasService } from './lista-de-tarefas.service';

describe('ListaDeTarefasService', () => {
  let service: ListaDeTarefasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDeTarefasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
