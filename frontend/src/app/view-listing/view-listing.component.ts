import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';
//might be unnessiacry 
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.css']
})
export class ViewListingComponent implements OnInit {

  dataList: any[] = []
  ListingsOutput = new Observable<any>();
  LoginName!: String;
  constructor(private apolloClient: Apollo, private getEndPoint: HttpClient, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.LoginName = this.activeRoute.snapshot.queryParamMap.get('name')!
   this.ListingsOutput = this.apolloClient.watchQuery<any>({
      query: this.GET_LISTING
    }).valueChanges.pipe(
      map((resp: any)=>{
        console.log(resp.data.getAdminListings)
        return resp.data.getAdminListings
      })
    )
  }

  private GET_LISTING = gql`
  query {
    getAdminListings{
      listing_title
        description
        street
        city
        price
        email
        username
        postal_code
    }
  }
  `
  // private GET_LISTINGBYUSER = gql`
  //   query ($userName: String!){
  //     getAdminlistingsbyUsername($username: ){
  //       listing_title
  //       description
  //       street
  //       city
  //       price
  //       email
  //       username
  //   	  postal_code
  //     }
       
  // }
  // `
  getListing(){
    console.log("active")
    this.apolloClient.watchQuery<any>({
      query: this.GET_LISTING
      // variables:{
      //   listing_title,
      //   description,
      //   street,
      //   city,
      //   price,
      //   email,
      //   username,
      //   postal_code,
      // }
    }).valueChanges.subscribe(resp=>{
      console.log(resp)
    })
  }

  // getListingbyUser(){
  //   const inputs = "testEcho" 
  //   return this.apolloClient.watchQuery<any>({
  //     query: this.GET_LISTINGBYUSER,
  //     variables:{      
  //     }
  //   })
  // }
}
