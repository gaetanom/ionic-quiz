import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as itemsData from './data'

@Injectable()
export class JsonplaceholderProvider {

  url_100_posts: string = 'https://jsonplaceholder.typicode.com/posts';
  url_5000_photos: string = 'https://jsonplaceholder.typicode.com/photos';

  oggetti;

  constructor(public http: Http) 
  { }

  get_posts()
  {
    return this.http.get(this.url_100_posts)
      .map(data => {
        return data.json();
      });
  }

  //get_photos()
  //leggi_storage(notifica?): Promise<{ elencoNotifiche: Array<{ title: string, body: string, dataRicevuta: number, letto: boolean }> }> {
  get_photos(): Promise<{ elenco: Array<any> }>
  {
    //return items;
      return new Promise((resolve) => {
        resolve( itemsData );
    });
  }

}
