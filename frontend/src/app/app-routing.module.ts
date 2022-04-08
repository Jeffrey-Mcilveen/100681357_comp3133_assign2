import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ViewListingComponent } from './view-listing/view-listing.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:"full"},
  {path: 'home', component: AppComponent,  },
  {path: 'view', component: ViewListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
