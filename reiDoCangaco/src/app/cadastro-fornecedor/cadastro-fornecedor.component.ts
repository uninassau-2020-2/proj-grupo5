import { FornecedorPf } from './../models/fornecedorPf.model';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FornecedorPj } from '../models/fornecedorPj.model';
import { FornecedorPjService } from './service/fornecedorPj.service';
import { FornecedorPfService } from './service/fornecedorPf.service';

@Component({
  selector: 'app-cadastro-fornecedor',
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.scss']
})
export class CadastroFornecedorComponent implements OnInit {

  fornecedorPj: FornecedorPj [];
  fornecedorPJList: FornecedorPj [] = [];

  fornecedorPf: FornecedorPf [];
  fornecedorPfList: FornecedorPf [] = [];

  formsRegister: FormGroup;
  filterFormFornecedorPj: FormGroup;
  filterFormFornecedorPf: FormGroup;
  displayedColumnsPj: string[] = ['razaoSocial', 'endereco', 'telefone', 'status', 'action'];
  dataSourcePj = new MatTableDataSource<FornecedorPj>();
  displayedColumnsPf: string[] = ['nome', 'endereco', 'telefone', 'status', 'action'];
  dataSourcePf = new MatTableDataSource<FornecedorPf>();
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  constructor(private readonly fb: FormBuilder,
              private readonly fornecedorPjService: FornecedorPjService,
              private readonly fornecedorPfService: FornecedorPfService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.createFilterFormPj();
    this.createFilterFormPf();
    this.listarFornecedorPJ();
    this.listarFornecedorPF();

    this.dataSourcePj.paginator = this.MatPaginator;

  }

  private listarFornecedorPJ(): void {
    this.fornecedorPjService.getAllFornecedorPj().subscribe((fornecedorPj: FornecedorPj[]) => {
      this.fornecedorPJList = (!!fornecedorPj) ? fornecedorPj : [];
      this.dataSourcePj.data = [...this.fornecedorPJList];
    });
  }

  private listarFornecedorPF(): void {
    this.fornecedorPfService.getAllFornecedorPf().subscribe((fornecedorPf: FornecedorPf[]) => {
      this.fornecedorPfList = (!!fornecedorPf) ? fornecedorPf : [];
      this.dataSourcePf.data = [...this.fornecedorPfList];
    });
  }


  private createForm(): void {
    this.formsRegister = new FormGroup({
      idFornecedorPJ: new FormControl(''),
      idFornecedorPF: new FormControl(''),
      razaoSocial: new FormControl('', Validators.required),
      nomeFantasia: new FormControl(''),
      nickName: new FormControl(''),
      cnpj: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      email: new FormControl(''),
      endereco: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cep: new FormControl('', Validators.required),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      pais: new FormControl(''),
      tipoFornecedor: new FormControl(''),
      nome: new FormControl('', Validators.required),
      sexo: new FormControl(''),
      cpf: new FormControl('', Validators.required),
      dataNascimento: new FormControl(''),
      flagAtivo: new FormControl(false)
    });
  }



  private createFilterFormPj(): void {
    this.filterFormFornecedorPj = this.fb.group({
      razaoSocialFilterCtrl: new FormControl('')
    });
  }
  private createFilterFormPf(): void {
    this.filterFormFornecedorPf = this.fb.group({
      nomeFilterCtrl: new FormControl('')
    });
  }

  private addFormValidators(listaCampos = []): void {
    listaCampos.forEach(campo => {
        this.formsRegister.get(campo).setValidators([Validators.required]);
    });
  }

  private fornecedorSelecionado(event: any): void {

          if (event.value === 'fornecedorPJ') {

          this.addFormValidators(['razaoSocial', 'cnpj']);

          this.formsRegister.get('nome').clearValidators();
          this.formsRegister.get('cpf').clearValidators();
          this.formsRegister.get('nome').updateValueAndValidity();
          this.formsRegister.get('cpf').updateValueAndValidity();

         } else if (event.value === 'fornecedorPF') {

          this.addFormValidators(['nome', 'cpf']);

          this.formsRegister.get('razaoSocial').clearValidators();
          this.formsRegister.get('cnpj').clearValidators();
          this.formsRegister.get('razaoSocial').updateValueAndValidity();
          this.formsRegister.get('cnpj').updateValueAndValidity();
        }
  }



  private salvarFornecedor(): void {

    if (this.formsRegister.get('tipoFornecedor').value === 'fornecedorPJ') {

      const fornecedorPJ: FornecedorPj = {

        idFornecedorPJ: this.formsRegister.get('idFornecedorPJ').value,
        nomeFantasia: this.formsRegister.get('nomeFantasia').value,
        razaoSocial: this.formsRegister.get('razaoSocial').value,
        cnpj: this.formsRegister.get('cnpj').value,
        nickName: this.formsRegister.get('nickName').value,
        telefone: this.formsRegister.get('telefone').value,
        celular: this.formsRegister.get('celular').value,
        email: this.formsRegister.get('email').value,
        endereco: this.formsRegister.get('endereco').value,
        complemento: this.formsRegister.get('complemento').value,
        bairro: this.formsRegister.get('bairro').value,
        cep: this.formsRegister.get('cep').value,
        cidade: this.formsRegister.get('cidade').value,
        pais: this.formsRegister.get('pais').value,
        estado: this.formsRegister.get('estado').value,
        status: this.formsRegister.get('flagAtivo').value ? 'I' : 'A',

      };
      if (this.formsRegister.value.idFornecedorPJ) {
          this.fornecedorPjService.editFornecedorPj(fornecedorPJ).subscribe(() => {
            this.listarFornecedorPJ();
            this.toastr.success('Fornecedo editado com sucesso!', 'Editar');
            this.limpar();
          });
      } else {
         this.fornecedorPjService.saveFornecedorPj(fornecedorPJ).subscribe(() => {
          this.listarFornecedorPJ();
          this.toastr.success('Fornecedor salvo com sucesso!', 'Salvar');
          this.limpar();
          });
      }

    } else if (this.formsRegister.get('tipoFornecedor').value === 'fornecedorPF') {
      const fornecedorPF: FornecedorPf = {

        idFornecedorPF: this.formsRegister.get('idFornecedorPF').value,
        nome: this.formsRegister.get('nome').value,
        cpf: this.formsRegister.get('cpf').value,
        sexo: this.formsRegister.get('sexo').value,
        dataNascimento: this.formsRegister.get('dataNascimento').value.toLocaleDateString('pt-BR'),
        nickName: this.formsRegister.get('nickName').value,
        telefone: this.formsRegister.get('telefone').value,
        celular: this.formsRegister.get('celular').value,
        email: this.formsRegister.get('email').value,
        endereco: this.formsRegister.get('endereco').value,
        complemento: this.formsRegister.get('complemento').value,
        bairro: this.formsRegister.get('bairro').value,
        cep: this.formsRegister.get('cep').value,
        cidade: this.formsRegister.get('cidade').value,
        pais: this.formsRegister.get('pais').value,
        estado: this.formsRegister.get('estado').value,
        status: this.formsRegister.get('flagAtivo').value ? 'I' : 'A'

      };
      if (this.formsRegister.value.idFornecedorPF) {

          this.fornecedorPfService.editFornecedorPf(fornecedorPF).subscribe(() => {
            this.listarFornecedorPF();
            this.toastr.success('Fornecedo editado com sucesso!', 'Editar');
            this.limpar();
          });
      } else {
         this.fornecedorPfService.saveFornecedorPf(fornecedorPF).subscribe(() => {
          this.listarFornecedorPF();
          this.toastr.success('Fornecedor salvo com sucesso!', 'Salvar');
          this.limpar();
          });
      }
    }

  }


  private limpar(): void {
    this.formsRegister.reset();
  }

// FORNECEDOR PJ
  private getRowTableFornecedorPj(value: any): void {
    this.formsRegister.get('idFornecedorPJ').setValue(value.idFornecedorPJ);
    this.formsRegister.get('nomeFantasia').setValue(value.nomeFantasia);
    this.formsRegister.get('razaoSocial').setValue(value.razaoSocial);
    this.formsRegister.get('cnpj').setValue(value.cnpj);
    this.formsRegister.get('nickName').setValue(value.nickName);
    this.formsRegister.get('telefone').setValue(value.telefone);
    this.formsRegister.get('celular').setValue(value.celular);
    this.formsRegister.get('email').setValue(value.email);
    this.formsRegister.get('endereco').setValue(value.endereco);
    this.formsRegister.get('complemento').setValue(value.complemento);
    this.formsRegister.get('bairro').setValue(value.bairro);
    this.formsRegister.get('cep').setValue(value.cep);
    this.formsRegister.get('cidade').setValue(value.cidade);
    this.formsRegister.get('pais').setValue(value.pais);
    this.formsRegister.get('estado').setValue(value.estado);
    this.formsRegister.get('flagAtivo').setValue(value.status === 'A' ? false : true );
  }


  private excluirFornecedorPj(id: string): void {
    this.fornecedorPjService.deleteFornecedorPj(id).subscribe(() => {
      this.fornecedorPjService.getAllFornecedorPj().subscribe(fornecedorpj => {
       this.fornecedorPJList = fornecedorpj;
       this.dataSourcePj.data = this.fornecedorPJList;
       this.toastr.success('Fornecedor excluído com sucesso!', 'Excluir');
      });
     });
  }


  filterTabelaFornecedorPj(): void {
    let filteredTable: FornecedorPj[] = this.fornecedorPJList;
    if (!this.filterFormFornecedorPj.value.razaoSocialFilterCtrl) {
      this.dataSourcePj.data = [...this.fornecedorPJList];
    }
    if (this.filterFormFornecedorPj.value.razaoSocialFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x => {
        return x.razaoSocial ? x.razaoSocial.toUpperCase()
        .includes(this.filterFormFornecedorPj.value.razaoSocialFilterCtrl.toUpperCase()) : null;
      });
     }
    this.dataSourcePj.data = filteredTable;
  }

// FORNECEDOR PF

private getRowTableFornecedorPf(value: any): void {
  this.formsRegister.get('idFornecedorPF').setValue(value.idFornecedorPF);
  this.formsRegister.get('nome').setValue(value.nome);
  this.formsRegister.get('sexo').setValue(value.sexo);
  this.formsRegister.get('dataNascimento').setValue(new Date (this.formatDate(value.dataNascimento)));
  this.formsRegister.get('cpf').setValue(value.cpf);
  this.formsRegister.get('nickName').setValue(value.nickName);
  this.formsRegister.get('telefone').setValue(value.telefone);
  this.formsRegister.get('celular').setValue(value.celular);
  this.formsRegister.get('email').setValue(value.email);
  this.formsRegister.get('endereco').setValue(value.endereco);
  this.formsRegister.get('complemento').setValue(value.complemento);
  this.formsRegister.get('bairro').setValue(value.bairro);
  this.formsRegister.get('cep').setValue(value.cep);
  this.formsRegister.get('cidade').setValue(value.cidade);
  this.formsRegister.get('pais').setValue(value.pais);
  this.formsRegister.get('estado').setValue(value.estado);
  this.formsRegister.get('flagAtivo').setValue(value.status === 'A' ? false : true );
}


private excluirFornecedorPf(id: string): void {
  this.fornecedorPfService.deleteFornecedorPf(id).subscribe(() => {
    this.fornecedorPfService.getAllFornecedorPf().subscribe(fornecedorpf => {
     this.fornecedorPfList = fornecedorpf;
     this.dataSourcePf.data = this.fornecedorPfList;
     this.toastr.success('Fornecedor excluído com sucesso!', 'Excluir');
    });
   });
}


filterTabelaFornecedorPf(): void {
  let filteredTable: FornecedorPf[] = this.fornecedorPfList;
  if (!this.filterFormFornecedorPf.value.nomeFilterCtrl) {
    this.dataSourcePf.data = [...this.fornecedorPfList];
  }
  if (this.filterFormFornecedorPf.value.nomeFilterCtrl) {
    filteredTable = filteredTable.filter
    ( x => {
      return x.nome ? x.nome.toUpperCase()
      .includes(this.filterFormFornecedorPf.value.nomeFilterCtrl.toUpperCase()) : null;
    });
   }
  this.dataSourcePf.data = filteredTable;
}



  formatDate(newDate): Date {
    const split = newDate.split('/');
    return new Date(split[1] + '/' + split[0] + '/' + split[2]);
  }


}
