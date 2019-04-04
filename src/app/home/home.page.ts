import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  count: number;
  m_num: number;
  results: number[] = [];
  myForm = this.fb.group({
    multi_num: ''
  });

  constructor( private storage: Storage,
    private fb: FormBuilder) {}

  genResult() {
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
