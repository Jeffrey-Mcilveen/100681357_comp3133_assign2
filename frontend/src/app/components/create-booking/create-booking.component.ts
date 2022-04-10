import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {

  ListingsOutput = new Observable<any>();

  loginCheck!: Observable<any>;
  LoginName!: String;
  
  constructor(private apolloClient: Apollo,private activeRoute: ActivatedRoute, private router: Router) {
   }
   bookingform = new FormGroup({
    booking_id: new FormControl(),
    booking_start: new FormControl(),
    booking_end: new FormControl()

   })
   

  ngOnInit(): void {
    this.ListingsOutput = this.apolloClient.watchQuery<any>({
      query: this.GET_LISTING
    }).valueChanges.pipe(
      map((resp: any)=>{
        console.log(resp.data.getAdminListings)
        return resp.data.getAdminListings
      })
    )
    this.LoginName = this.activeRoute.snapshot.queryParamMap.get('name')!
    console.log("test on init")
    console.log(this.LoginName)
  }

  private GET_LISTING = gql`
  query {
    getAdminListings{
      listing_id
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
  private CREATEBOOKING = gql`
  mutation adduserbooking($listing_id:String!,$booking_id:String!,$booking_start:String!,$booking_end:String!,$username:String!){
    adduserbooking(
    listing_id: $listing_id
    booking_id: $booking_id
    booking_start: $booking_start
    booking_end: $booking_end
    username: $username
    )
  }
  `
  onSubmit(input:any){
    
    let listIN = input.listing_id
    let bookID = this.bookingform.value.booking_id
    let bookstart = this.bookingform.value.booking_start
    let bookend = this.bookingform.value.booking_end
    let inputuser = this.LoginName
    console.log(this.bookingform.value)
    console.log(listIN)
    console.log(inputuser)
    //console.log(bookstart)
    console.log(this.bookingform.value.booking_start)
    this.AddBooking(listIN,bookID,bookstart,bookend,inputuser)
  }
  testfun(input:any){
    console.log(input)
    console.log(input.listing_id)
  }
  
  AddBooking(listing_id:any,booking_id:any,booking_start:any,booking_end:any,username:any){
    console.log(listing_id,booking_id,booking_start,booking_end,username)
    this.apolloClient.mutate({
      mutation: this.CREATEBOOKING,
      variables:{
        listing_id: listing_id,
        booking_id: booking_id,
        booking_start:booking_start,
        booking_end: booking_end,
        username: username
      }
    }).subscribe
  }

}
