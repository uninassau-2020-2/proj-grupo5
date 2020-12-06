import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.scss']
})
export class ModalAlertaComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalAlertaComponent>) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
