import { Component, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-search-listings',
  templateUrl: './search-listings.component.html',
  styleUrls: ['./search-listings.component.css']
})
export class SearchListingsComponent implements OnInit {

  LoginName!: String;

  //cityOutput2 = String
  dataList: any[] = []
  cityOutPut1: any
  errorsUser: any
  errorsCity: any
  errorsPostal: any
  userOutput : any;
  postalOutput : any;
  
  constructor(private apolloClient: Apollo, private activeRoute: ActivatedRoute, private router: Router) {
    
   }

  getUsernameForm = new FormGroup({
    username: new FormControl()
  })
  getCityForm = new FormGroup({
    cities: new FormControl()
  })
  getPostalForm = new FormGroup({
    postal_code: new FormControl()
  })

  private CITYLISTING = gql`
  query Getlisting($cityinput: String!){
    getAdminlistingsbyCity(city: $cityinput){
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
  private USERLISTING = gql`
  query getbyuser($userIN: String!){
  getAdminlistingsbyUsername(userName:$userIN){
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
  private POSTALLISTING = gql`
  query getPostalCODE($code: String!){
  getAdminlistingsbyPostalCode(postal_code: $code){
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
  getCity(input: String){
    this.errorsCity = null
    this.cityOutPut1 = null
    console.log("getCity() input is "+ input)
    this.apolloClient.watchQuery<any>({
      query: this.CITYLISTING,
      variables:{
        cityinput: input
      }
    }).valueChanges.subscribe(resp =>{
      console.log(resp.data.getAdminlistingsbyCity)
      if(resp.data.getAdminlistingsbyCity.length == 0){
        this.errorsCity = "NO Data found"
      }else{
        this.cityOutPut1 = resp.data.getAdminlistingsbyCity
      }
      
    })
  }
  getUsername(input: String){
    this.errorsUser = null
    this.userOutput = null
    console.log("getUsername() input is "+ input)
    this.apolloClient.watchQuery<any>({
      query: this.USERLISTING,
      variables:{
        userIN: input
      }
    }).valueChanges.subscribe(resp =>{
      console.log(resp.data.getAdminlistingsbyUsername)
      if(resp.data.getAdminlistingsbyUsername.length == 0){
        this.errorsUser = "NO Data found"
      }else{
        console.log(resp)
        this.userOutput = resp.data.getAdminlistingsbyUsername
      }
      
    })
  }
  getPostal(input: String){
    this.errorsPostal = null
    this.postalOutput = null
    console.log("getPostal() input is "+ input)
    this.apolloClient.watchQuery<any>({
      query: this.POSTALLISTING,
      variables:{
        code: input
      }
    }).valueChanges.subscribe(resp =>{
      console.log(resp.data.getAdminlistingsbyPostalCode)
      if(resp.data.getAdminlistingsbyPostalCode.length == 0){
        this.errorsPostal = "NO Data found"
      }else{
        console.log(resp)
        this.postalOutput = resp.data.getAdminlistingsbyPostalCode
      } 
    })
  }


  onSubmitCity(input: any){
    console.log(input.cities)
    this.getCity(input.cities)

  }
  onSubmitUser(input: any){
    console.log(input.username)
    this.getUsername(input.username)
  }
  onSubmitPostal(input:any){
    console.log(input.postal_code)
    this.getPostal(input.postal_code)
  }

  ngOnInit(): void {
    this.LoginName = this.activeRoute.snapshot.queryParamMap.get('name')!
  }

}
