import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';

const routes: Routes = [
  {path: '', redirectTo:'signin', pathMatch:"full"},
  {path:'signin', component: UserSignupComponent},
  // {path: 'home', component: AppComponent,  },
  {path: 'view', component: ViewListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
