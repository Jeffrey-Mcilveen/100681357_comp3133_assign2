import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';

Router
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginKeyAdmin: string = 'USERNAME'

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
          //localStorage.setItem(this.loginKeyAdmin, `${resp.data.login[0]}`)
          this.router.navigate(['/view'])
        }else{
          console.log("is customer")
          const input = resp.data.login[0]
          this.router.navigate(['/createbook'], {queryParams:{name: input}})
        }
      }
      //{name: input}
    })
  }

  constructor(private apolloClient: Apollo, private router: Router, private activeRoute: ActivatedRoute) { }

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
