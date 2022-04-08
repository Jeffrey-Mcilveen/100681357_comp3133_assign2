import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.css']
})
export class ViewListingComponent implements OnInit {

  constructor(private apolloClient: Apollo) { }

  ngOnInit(): void {
  }

  private GET_LISTING = gql`
  query getAdminListings{
        listing_title
        description
        street
        city
        price
        email
        username
        postal_code
  }
  `
  getListing(){
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
}
