import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { JsonplaceholderProvider } from '../../providers/jsonplaceholder/jsonplaceholder';


@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ],
  providers: [
    JsonplaceholderProvider
  ]
})
export class HomeModule {}
