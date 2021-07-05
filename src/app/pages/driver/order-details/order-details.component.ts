import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Connect_info } from 'src/app/models/connectinfo';
import { Driver } from 'src/app/models/driversModel';
import { AlertService } from 'src/app/services/alert.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  connect_info: Connect_info[];
  status: any;
  order_number: any;
  // order_info:Driver;

  constructor(public modalController: ModalController, 
    public actionSheetController: ActionSheetController,
    private httpService :HttpServiceService,
    private alertService: AlertService,
    private navCtrl: NavController,
    ) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  submit() {
    console.log("Accept")
    // this.httpService.makeGet('auth/send_status').subscribe()
    // this.status  = 'accept';
    this.order_number =  '89485';

    let data = {
      order_number:this.order_number
    }
    console.log(data)
    this.httpService.post('auth/update_status', data).subscribe(
      data => {
        this.alertService.presentToast("تم تحديث البيانات بنجاح");
      },
      error => {
        console.log(error.error);
      },
      () => {
        this.modalController.dismiss();
      }
    )
  }

  ionViewWillEnter() {
    this.httpService.makeGet('auth/receive_infoconnect').subscribe(
      // user => {
      //   this.user = user;
      // },
      connect_info => {
        this.connect_info = connect_info;
        console.log(connect_info);
      }
    )
  }

}