import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modalDetalhesVenda',
  templateUrl: './modalDetalhesVenda.component.html',
  styleUrls: ['./modalDetalhesVenda.component.scss']
})
export class ModalDetalhesVendaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalDetalhesVendaComponent>) { }

  ngOnInit() {

  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
