import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  num_1: number;
  num_2: number;
  result_operated: any;

  count: number;
  m_num: number;
  results: number[] = [];
  myForm = this.fb.group({
    multi_num: ''
  });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor( private storage: Storage,
    private fb: FormBuilder,
    private http: HttpClient,
    private nativeHttp: HTTP,
    private loadingCtrl: LoadingController) {}

  plusOperation() {
    this.result_operated = this.num_1 + this.num_2;
    console.log(this.result_operated);
  }

  minusOperation() {
    this.result_operated = this.num_1 - this.num_2;
  }

  multipleOperation() {
    this.result_operated = this.num_1 * this.num_2;
  }

  divideOperation() {
    this.result_operated = this.num_1 / this.num_2;
  }

  genResult() {
    // const loading = await this.loadingCtrl.create({
    //   message: 'Loading...'
    // });
    // await loading.present();

    // from(this.nativeHttp.get('http://localhost:8000/Multiplication/' 
    // + this.myForm.value.multi_num + '/', {}, {'Content-Type': 'application/json'}))
    // .pipe(finalize(() => loading.dismiss()))
    //  .subscribe(
    //     data => {console.log(data);}
    //   , err => {
    //   console.log('Native Call error: ', err);
    // });

    // this.http.get('http://localhost:8000/Multiplication/'
    //  + this.myForm.value.multi_num).subscribe(
    //       (data) => {
    //         loading.dismiss();
    //         console.log(data);
    //       });
    // this.nativeHttp.get('http://localhost:8000/Multiplication/' + this.myForm.value.multi_num, 
    // {}, {'Content-Type': 'application/json'}).then((data) => {
    //   loading.dismiss();
    //   console.log(data);
    // });
  
    // this.http.get('http://localhost:8000/Multiplication/'+this.myForm.value.multi_num+'/', this.httpOptions)
    // .subscribe((data) => {
    //   console.log(data)
    // });

    this.m_num = this.myForm.value.multi_num;
    const res: number[] = [];
    for (let i = 1; i <= 12; i++) {
      res.push(i * this.m_num);
    }
    this.results = res;
    this.updateCountShowing();
  }

  updateCountShowing() {
    this.storage.get(String(this.m_num)).then((val) => {
      if (!val) {
        this.count = 1;
      } else {
        this.count = val + 1;
        console.log(val);
      }
      this.storage.set(String(this.m_num), this.count).then(() => {
        console.log('Update count');
      });
    });
  }
}
