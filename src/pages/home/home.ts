import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';

import { JsonplaceholderProvider } from '../../providers/jsonplaceholder/jsonplaceholder';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items : Array<any>;
  argomenti = [];
  argomenti_selected = [];
  is_tutti_argomenti : boolean = true;
  num : number = 10;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public service: JsonplaceholderProvider) 
  { }

  ionViewDidLoad()
  {
    this.load_data();
  }

  load_data() 
  {
    let loading = this.loadingCtrl.create({
      content: `Loading...`
    });
    loading.present();

    this.service.get_photos()
    .then((res) => {
      
      this.items = res['default'];

      let argomeno = '';

      for (let i = 0; i < this.items.length; i++)
      {
        if(argomeno != this.items[i].argomento)
        {
          argomeno = this.items[i].argomento;
          this.argomenti.push(this.items[i].argomento);
        }
      }
    })
    .then((res) => {
      loading.dismiss();
    });
  }

  go_to_quesiti()
  {
    this.navCtrl.push(
      'QuesitiPage', 
      {
        'num' : this.num,
        'argomenti_selected' : this.argomenti_selected,
        'is_tutti_argomenti' : this.is_tutti_argomenti
      }
    );
  }

  set_num_quesiti(event)
  {
    this.num = parseInt(event.value);
  }

  abilita_tutti_argomenti()
  {
    this.argomenti_selected = [];

    if(this.is_tutti_argomenti == false)
    {
      let toast = this.toastCtrl.create({
        message: 'Seleziona almeno un argomento',
        duration: 1500,
        position: 'middle',
        dismissOnPageChange: true
      });
      toast.present();
    }
  }

  abilita_argomenti(arg , event)
  {
    if(event.value == true)
    {
      this.argomenti_selected.push(arg);
    }
    else {
      for(let i = 0; i < this.argomenti_selected.length; i++)
      {
        if(arg == this.argomenti_selected[i])
        {
          this.argomenti_selected.splice(i, 1);
        }
      }
    }

    
  }


}
