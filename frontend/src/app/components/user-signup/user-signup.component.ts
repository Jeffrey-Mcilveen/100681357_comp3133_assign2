import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Apollo,gql } from 'apollo-angular';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  usertypes: User[] = [
    new User('1', 'customer'),
    new User('2','admin')
  ]
  

  signinForm = new FormGroup({
    user_Name: new FormControl(),
    first_Name: new FormControl(),
    last_Name: new FormControl(),
    pass_word: new FormControl(),
    e_mail: new FormControl(),
    type: new FormControl()
  })

  private ADDNEWUSER = gql`
  mutation addUser($userN:String!,$firstN:String!,$lastN:String!,$passW:String!,$EMAIL:String!,$Type_:String!){
    addUser(
    userName: $userN,
    firstName:$firstN,
    lastName: $lastN,
    password: $passW,
    email: $EMAIL,
    type: $Type_
    ){
      userName
      firstName
      lastName
      password
      email
      type
    }

  }
    `
    


  constructor(private apolloClient: Apollo) { }

  ngOnInit(): void {
  }
  AddU(Uinput: any ,Finput: any,Linput: any, pass: any,_EMAIL: any ,Types_: any ){
    console.log(Uinput, Finput, Linput,pass,_EMAIL,Types_)
    this.apolloClient.mutate({
      mutation: this.ADDNEWUSER,
      variables:{
        userN: Uinput,
        firstN: Finput,
        lastN: Linput,
        passW: pass,
        EMAIL: _EMAIL,
        Type_: Types_
        
      }
    }).subscribe()
  }


  onSubmit(){
    console.log(this.signinForm.value)
    console.log(this.signinForm.value.user_Name)
    console.log(this.signinForm.value.first_Name)
    console.log(this.signinForm.value.last_Name)
    console.log(this.signinForm.value.pass_word)
    console.log(this.signinForm.value.e_mail)
    console.log(this.signinForm.value.type)
    let USER = this.signinForm.value.user_Name
    let FIRST = this.signinForm.value.first_Name
    let LAST= this.signinForm.value.last_Name
    let PASS= this.signinForm.value.pass_word
    let EMAIL= this.signinForm.value.e_mail
    let TYPE= this.signinForm.value.type
    this.AddU(USER,FIRST,LAST,PASS,EMAIL,TYPE)
  }

}
