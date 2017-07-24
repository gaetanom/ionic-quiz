import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

/*import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';*/

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp/*,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage*/
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'md',
      /*iconMode: 'ios',
      ABQIAAAATkU5JnjdTcELnoWQ6bsvWBRDRGN0bvUfzA-seUBs6l26KCSS7hQQWpk_NzdxPM6sNORbGMjiFnl-TQ
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'*/
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp/*,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage*/
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
