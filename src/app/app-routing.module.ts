import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-de-tarefas',
    pathMatch: 'full'
  },
  {
    path: 'lista-de-tarefas',
    loadChildren: () => import('./lista-de-tarefas/lista-de-tarefas.module').then( m => m.ListaDeTarefasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
