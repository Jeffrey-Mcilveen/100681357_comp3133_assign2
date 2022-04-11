import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Apollo,gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-addlistings',
  templateUrl: './admin-addlistings.component.html',
  styleUrls: ['./admin-addlistings.component.css']
})
export class AdminAddlistingsComponent implements OnInit {

  LoginName!: String;
  constructor(private apolloClient: Apollo,private activeRoute: ActivatedRoute, private router: Router) { }
  
  listingForm = new FormGroup({
    listing_id: new FormControl(),
    listing_title: new FormControl(),
    description: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    postal_code: new FormControl(),
    price: new FormControl(),
    email: new FormControl(),
  })

  private NEWLISTING = gql`
  mutation addAdminlisting($List_id: String!, $list_title:String!, $descrip: String!, $Streetinput: String!,
   $cityinput: String!, $postal__code: String!, $prices: Float!, $E_mail: String!, $userN: String! ){
    addAdminlisting(
    listing_id: $List_id
    listing_title: $list_title
    description:  $descrip
    street: $Streetinput
    city : $cityinput
    postal_code: $postal__code
    price: $prices
    email: $E_mail
    username: $userN
  ){
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price
    email
    username
  }
    
  }

  `

  ngOnInit( ): void {
    this.LoginName = this.activeRoute.snapshot.queryParamMap.get('name')!
    console.log("test on init")
    console.log(this.LoginName)
  }
  ADDListing(List_idU: any, list_titleU:any,descripU:any,
    StreetinputU:any,cityinputU:any,postal__codeU: any,
    pricesU: any, E_mailU:any, userNU:any ){
      console.log(List_idU,list_titleU,descripU,StreetinputU,cityinputU,postal__codeU,pricesU,E_mailU,userNU)
      this,this.apolloClient.mutate({
        mutation: this.NEWLISTING,
        variables:{
          List_id: List_idU,
          list_title: list_titleU,
          descrip: descripU,
          Streetinput: StreetinputU,
          cityinput: cityinputU,
          postal__code: postal__codeU,
          prices: pricesU,
          E_mail: E_mailU,
          userN: userNU
        }
      }).subscribe(resp=>{
        console.log(resp)
        this.listingForm.reset()
        console.log("listing submitted")
      })

  }
  onSubmit(input: any){
    console.log(input)
    console.log(this.LoginName)

    this.ADDListing(input.listing_id,input.listing_title,input.description
      ,input.street,input.city,input.postal_code,
      input.price,input.email,this.LoginName)
      console.log("should reset")
      this.listingForm.reset()
    
  }



}
