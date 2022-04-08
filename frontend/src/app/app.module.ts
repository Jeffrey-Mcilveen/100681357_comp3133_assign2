import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {InMemoryCache} from '@apollo/client/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import { ViewListingComponent } from './view-listing/view-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //GraphQLModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            //uri: 'https://48p1r2roz4.sse.codesandbox.io',
            //uri: "https://graphql-weather-api.herokuapp.com",
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
