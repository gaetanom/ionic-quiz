import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Slides } from 'ionic-angular';

import { JsonplaceholderProvider } from '../../providers/jsonplaceholder/jsonplaceholder';

@IonicPage()
@Component({
  selector: 'page-quesiti',
  templateUrl: 'quesiti.html'
})
export class QuesitiPage {

  @ViewChild(Slides) slides: Slides;

  items : Array<any>;
  argomenti_items : Array<any> = [];
  selected_items : Array<any> = [];
  num : number = 10;
  argomenti_selected;
  is_tutti_argomenti;
  numero_di_risposte = 0;
  numero_di_risposte_ok = 0;
  numero_di_risposte_ko = 0;
  vedi_risultato : boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public service: JsonplaceholderProvider) 
  { 
    this.num = this.navParams.get('num');
    this.argomenti_selected = this.navParams.get('argomenti_selected');
    this.is_tutti_argomenti = this.navParams.get('is_tutti_argomenti');    
  }

  ionViewDidLoad()
  {
    this.load_data();
  }

  load_data() 
  {
    this.selected_items = [];
    this.numero_di_risposte = 0;
    this.numero_di_risposte_ok = 0;
    this.numero_di_risposte_ko = 0;

    let loading = this.loadingCtrl.create({
      content: `Loading...`
    });
    loading.present();

    this.service.get_photos()
    .then((res) => {
      
      this.items = res['default'];

      if(this.is_tutti_argomenti)
      {
        this.argomenti_items = this.items
      }
      else {
        // filtra i quesiti su base argomenti selezionati
        for (let i = 0; i < this.items.length; i++)
        {
          if(this.argomenti_selected.indexOf(this.items[i].argomento) != -1)
          {  
            this.argomenti_items.push(this.items[i]);
          }
        }
      }

      // prende randomicamente i quesiti
      for (let i = 0; i < this.num; i++)
      {
        this.selected_items[i] = this.argomenti_items[Math.floor(Math.random() * this.argomenti_items.length)];
        // setta l'ordine delle risposte
        this.selected_items[i]['array_number_random'] = this.number_random_in_array();
      }
    })
    .then((res) => {
      loading.dismiss();
    });
  }

  set_view_esito()
  {
    this.vedi_risultato = this.vedi_risultato ? false: true;
  }

  /*set_num_quesiti(event)
  {
    this.num = parseInt(event.value);

    this.load_data();
  }*/

  number_random_in_array()
  {
    var input = [1,2,3,4];
    for (var i = input.length-1; i >=0; i--) {
    
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
        
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;    
  }

  set_risposta(indice, quesito, risposta)
  {
    this.selected_items[indice]['risposta_data'] = risposta;

    this.numero_di_risposte = 0;
    this.numero_di_risposte_ok = 0;
    this.numero_di_risposte_ko = 0;

    let cerca_numero_di_risposte = this.selected_items.filter(element => {
      if(element.risposta_data)
      {
        this.numero_di_risposte++;

        if(element.risposta_data == 1)
        {
          this.numero_di_risposte_ok++;
        }      
        else{
          this.numero_di_risposte_ko++;
        }

        return true;
      }      
    });

    this.slides.slideTo(this.numero_di_risposte - 1);

    return cerca_numero_di_risposte;
  }

  detail(art)
  {
    let alert = this.alertCtrl.create({
      title: art.domanda,
      subTitle: art.body,
      buttons: ['OK']
    });
    alert.present();
  }

}
