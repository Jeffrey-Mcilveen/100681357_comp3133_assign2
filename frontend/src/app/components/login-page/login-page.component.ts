import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';
Router
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  loginForm = new FormGroup({
    user_Name: new FormControl(),
    pass_word: new FormControl()
  })
  private CHECKUSER = gql`
  query login($user_Name:String!,$pass_word:String!){
    login(
    userName: $user_Name
    password: $pass_word
  )
  }
  `
  //   private GET_LISTINGBYUSER = gql`
  //   query getAdminlistingsbyUsername($username: String!){
  //     getAdminlistingsbyUsername(userName: $username ){
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
  // getUserbyID(){
  //   const user = "testEcho"
  //   this.apolloClient.watchQuery<any>({
  //     query: this.GET_LISTINGBYUSER,
  //     variables:{
  //       username : user
  //     }
  //   }).valueChanges.subscribe(resp =>{
  //     console.log(resp)
  //   })

  // }
  
  Login(user_Name:any,pass_word:any ){
    console.log("Login input are " + user_Name+ " and " + pass_word)
    this.apolloClient.watchQuery<any>({
      query: this.CHECKUSER,
      errorPolicy: 'all',
      variables:{
        user_Name: user_Name,
        pass_word: pass_word 
      }
    }).valueChanges.subscribe(resp =>{
      if(resp.data.login == null){
        console.log("incorrect input")

      }else{
        console.log(resp.data.login)
        if(resp.data.login[2] == 'admin'){
          console.log("is admin")
          this.router.navigate(['/view'])
        }else{
          console.log("is customer")
          this.router.navigate(['/signup'])
        }
      }
      
    })
  }

  constructor(private apolloClient: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm.value)
    console.log(this.loginForm.value.user_Name)
    console.log(this.loginForm.value.pass_word)
    let UserN = this.loginForm.value.user_Name
    let passw = this.loginForm.value.pass_word
    this.Login(UserN,passw)

  }

}
