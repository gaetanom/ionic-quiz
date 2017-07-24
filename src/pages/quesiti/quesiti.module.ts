import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuesitiPage } from './quesiti';

import { JsonplaceholderProvider } from '../../providers/jsonplaceholder/jsonplaceholder';

@NgModule({
  declarations: [
    QuesitiPage,
  ],
  imports: [
    IonicPageModule.forChild(QuesitiPage),
  ],
  exports: [
    QuesitiPage
  ],
  providers: [
    JsonplaceholderProvider
  ]
})
export class QuesitiModule {}
