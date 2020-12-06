import { MaskService } from './../shared/mask.service';
import { masks } from './../shared/masks.models';
import { Empregado } from './../models/empregado.model';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EmpregadoService } from './empregadoService.service';
import { Masks } from '../shared/masks.interfaces';

@Component({
  selector: 'app-cadastro-empregado',
  templateUrl: './cadastro-empregado.component.html',
  styleUrls: ['./cadastro-empregado.component.scss']
})
export class CadastroEmpregadoComponent implements OnInit {

  empregado: Empregado [];
  empregadoList: Empregado [] = [];
  public masks: Masks = this.maskService.masks;
  formsRegister: FormGroup;
  filterForm: FormGroup;
  displayedColumns: string[] = ['nome', 'endereco', 'telefone', 'status', 'action'];
  dataSource = new MatTableDataSource<Empregado>();
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  constructor(private readonly fb: FormBuilder,
              private readonly maskService: MaskService,
              private readonly empregadoService: EmpregadoService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.createFilterForm();
    this.listarEmpregados();
    this.dataSource.paginator = this.MatPaginator;
  }

  private listarEmpregados(): void {
    this.empregadoService.getAllEmpregado().subscribe((empregado: Empregado[]) => {
      this.empregadoList = (!!empregado) ? empregado : [];
      this.dataSource.data = [...this.empregadoList];
    });
  }


  private createForm(): void {
    this.formsRegister = new FormGroup({
      idEmpregado: new FormControl(''),
      nomeEmpregado: new FormControl('', Validators.required),
      sexo: new FormControl(''),
      cpf: new FormControl('', Validators.required),
      dataNascimento: new FormControl(''),
      telefone: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      email: new FormControl(''),
      endereco: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cep: new FormControl('', Validators.required),
      cidade: new FormControl(''),
      pais: new FormControl(''),
      estado: new FormControl(''),
      flagAtivo: new FormControl(false),
      status: new FormControl('')
    });
  }

  private createFilterForm(): void {
    this.filterForm = this.fb.group({
      nomeFilterCtrl: new FormControl('')
    });
  }


  private limpar(): void {
    this.formsRegister.reset();
    this.toastr.info('Campos limpos!', 'Limpar');
  }

  private salvarEmpregado(): void {

    const empregado: Empregado = {

      idEmpregado: this.formsRegister.get('idEmpregado').value,
      nomeEmpregado: this.formsRegister.get('nomeEmpregado').value,
      sexo: this.formsRegister.get('sexo').value,
      cpf: this.formsRegister.get('cpf').value,
      dataNascimento: this.formsRegister.get('dataNascimento').value.toLocaleDateString('pt-BR'),
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
    if (this.formsRegister.value.idEmpregado) {

        this.empregadoService.editEmpregado(empregado).subscribe(() => {
          this.listarEmpregados();
          this.toastr.success('Empregado editado com sucesso!', 'Editar');
          this.limpar();
        });
    } else {
       this.empregadoService.saveEmpregado(empregado).subscribe(() => {
        this.listarEmpregados();
        this.toastr.success('Usuário salvo com sucesso!', 'Salvar');
        this.limpar();
        });
    }
  }

  private excluirEmpregado(id: string): void {
    this.empregadoService.deleteEmpregado(id).subscribe(() => {
      this.empregadoService.getAllEmpregado().subscribe(empregados => {
       this.empregadoList = empregados;
       this.dataSource.data = this.empregadoList;
       this.filterForm.reset();
       this.toastr.success('Empregado excluído com sucesso!', 'Excluir');
      });
     });
  }


  getRowTableEmpregado(value: any): void {

    this.formsRegister.get('idEmpregado').setValue(value.idEmpregado);
    this.formsRegister.get('nomeEmpregado').setValue(value.nomeEmpregado);
    this.formsRegister.get('sexo').setValue(value.sexo);
    this.formsRegister.get('cpf').setValue(value.cpf);
    this.formsRegister.get('dataNascimento').setValue(new Date (this.formatDate(value.dataNascimento)));
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

  filterTabelaEmpregado(): void {
    let filteredTable: Empregado[] = this.empregadoList;
    if (!this.filterForm.value.nomeFilterCtrl) {
      this.dataSource.data = [...this.empregadoList];
    }
    if (this.filterForm.value.nomeFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x => {
        return x.nomeEmpregado ? x.nomeEmpregado.toUpperCase().includes(this.filterForm.value.nomeFilterCtrl.toUpperCase()) : null;
      });
     }
    this.dataSource.data = filteredTable;
  }

  formatDate(newDate): Date {
    const split = newDate.split('/');
    return new Date(split[1] + '/' + split[0] + '/' + split[2]);
  }
}
