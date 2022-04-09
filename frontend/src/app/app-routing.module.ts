import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:"full"},
  {path: 'login', component: LoginPageComponent},
  {path:'signup', component: UserSignupComponent},
  // {path: 'home', component: AppComponent,  },
  {path: 'view', component: ViewListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
