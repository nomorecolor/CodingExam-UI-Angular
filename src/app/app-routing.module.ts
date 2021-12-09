import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterestComponent } from './features/interest/interest.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: InterestComponent,
    canActivate: [AuthGuard],
    data: { requiresLogin: true },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
