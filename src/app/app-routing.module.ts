import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1authorizeComponent } from './steps/step1authorize/step1authorize.component';
import { Step2authorizedComponent } from './steps/step2authorized/step2authorized.component';

const routes: Routes = [
  { path: 'step-1', component: Step1authorizeComponent },
  { path: 'authorized', component: Step2authorizedComponent },
  { path: '',   redirectTo: '/step-1', pathMatch: 'full' },
  { path: '**', redirectTo: '/step-1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
