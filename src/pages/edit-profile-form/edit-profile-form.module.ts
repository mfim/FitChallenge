import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfileFormPage } from './edit-profile-form';

@NgModule({
  declarations: [
    EditProfileFormPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfileFormPage),
  ],
})
export class EditProfileFormPageModule {}
