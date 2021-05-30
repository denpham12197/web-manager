import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyMonAn} from '../../../models/mon-an';
// import {bodyGiaoVien} from '../../../models/giao-vien';
import {MonAnService} from '../../../services/mon-an-service.service';
import {NhanvienService} from '../../../services/nhanvien.service';

@Component({
  selector: 'app-tao-mon-an',
  templateUrl: './tao-mon-an.component.html',
  styleUrls: ['./tao-mon-an.component.css']
})
export class TaoMonAnComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listNhanVien: {[index: string]:any}[] = [];
  
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private monAnService: MonAnService,
    private nhanVienService: NhanvienService) {
      this.createForm = this.fb.group(
        {
          TenMonAn: [{ value: '', disabled: false }, [Validators.required]],
          MaNhanVien: [{ value: '', disabled: false }, [Validators.required]],
          BuaAn: [{ value: '', disabled: false }, [Validators.required]],
        }
      );
     }

  ngOnInit(): void {
    this.getListNhanVien()
  }

  async addMonAn() {
    const monAn = Object.assign({}, bodyMonAn);

    // Get data from form.
    monAn.TenMonAn = this.createForm.get("TenMonAn")!.value;
    monAn.MaNhanVien = this.createForm.get("MaNhanVien")!.value;
    monAn.BuaAn = this.createForm.get("BuaAn")!.value;

    if (this.createForm.valid) {
      const postMonAn = this.monAnService.addMonAn(monAn).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/mon-an',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([postMonAn]);
    }
  }

  async getListNhanVien() {
    const getNhanVien = this.nhanVienService.getListNhanVien().toPromise().then(
      async (dataResponse) => {
        this.listNhanVien = dataResponse
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getNhanVien]);
  }

}