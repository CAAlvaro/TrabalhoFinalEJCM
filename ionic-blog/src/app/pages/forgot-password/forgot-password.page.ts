import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastController, NavController } from '@ionic/angular';

import { AuthService } from '../../service/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotForm: FormGroup;

  constructor( public formbuilder: FormBuilder, public authService: AuthService,  public router: Router,
    public toastController: ToastController, public navController:NavController ) { 
    this.forgotForm = this.formbuilder.group({
  		email: ['', [Validators.required, Validators.email]]
  	});
  }

  ngOnInit() {
  }

  async presentToast( message ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  enviaEmail( forgotForm ) {
    if ( forgotForm.status == "VALID" ) {
      this.authService.enviaEmail(forgotForm.value).subscribe(
        ( res ) => {
          console.log(res);
          this.presentToast("Um email foi enviado para você!");
          this.router.navigate(['login']);
        },
        ( err ) => {
          console.log(err);
          this.presentToast("Email não encontrado. Faça seu cadastro.");
          this.router.navigate(['register']);
        }
      );
    }
  }

  public goBack() {
    this.navController.pop();
  }

}
