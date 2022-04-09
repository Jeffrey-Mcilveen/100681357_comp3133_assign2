import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {InMemoryCache} from '@apollo/client/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewListingComponent,
    UserSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //GraphQLModule,
    HttpClientModule,
    ApolloModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri:  'http://localhost:4001/graphql'
          }),
        };
      },
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
