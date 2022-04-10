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
    var date = new Date()
    console.log(date)
   }
   bookingform = new FormGroup({
    user_name: new FormControl(),
    booking_id: new FormControl(),
    booking_date: new FormControl(),
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
  onSubmit(){
    console.log(this.bookingform.value)
  }
  
  AddBooking(listing_id:any,booking_id:any,booking_start:any,booking_end:any,username:any){

  }

}
