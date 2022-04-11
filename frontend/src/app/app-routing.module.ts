import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { AdminAddlistingsComponent } from './components/admin-addlistings/admin-addlistings.component';
import { SearchListingsComponent } from './components/search-listings/search-listings.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:"full"},
  {path: 'login', component: LoginPageComponent},
  {path:'signup', component: UserSignupComponent},
  {path: 'view', component: ViewListingComponent },
  {path: 'viewbook', component: ViewBookingsComponent },
  {path: 'createbook', component: CreateBookingComponent },
  {path: 'addlist',component: AdminAddlistingsComponent},
  {path: 'search', component: SearchListingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
