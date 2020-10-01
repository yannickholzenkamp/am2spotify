import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1authorizeComponent } from './steps/step1authorize/step1authorize.component';

const routes: Routes = [
  { path: 'step-1', component: Step1authorizeComponent },
  { path: '',   redirectTo: '/step-1', pathMatch: 'full' },
  { path: '**', redirectTo: '/step-1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
