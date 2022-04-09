import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Apollo,gql } from 'apollo-angular';
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
  query logins($UserN:String!,$passW:String!){
    login(
    userName: $UserN
    password: $passW
  )
  }
  `
  Login(user_Name:String,pass_word:String ){
    console.log("Login input are " + user_Name+ " " + pass_word)
    this.apolloClient.watchQuery<any>({
      query: this.CHECKUSER,
      //errorPolicy: 'all',
      variables:{
        userN: user_Name,
        passW: pass_word 
      }
    }).valueChanges.subscribe(resp =>{
      console.log(resp)
      
    })

  }

  constructor(private apolloClient: Apollo) { }

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
