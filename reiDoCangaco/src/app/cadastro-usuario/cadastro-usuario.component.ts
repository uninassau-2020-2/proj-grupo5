import { Empregado } from './../models/empregado.model';
import { EmpregadoService } from './../cadastro-empregado/empregadoService.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink/dist/subsink';
import { Usuarios } from '../models/usuarios.model';
import { UsuarioService } from './usuario.service';
import { fromEvent,  } from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  formsRegister: FormGroup;
  usuarioList: Usuarios[] = [];
  empregadoList: Empregado[];
  empregadoAutocomplete: Empregado[];
  idEmpregado: Empregado;
  filterFormUsuario: FormGroup;
  displayedColumns: string[] = ['tipo', 'userName', 'status', 'action'];
  dataSource = new MatTableDataSource<Usuarios>();
  @ViewChild('empregadoAuto') empregadoAuto;
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  private readonly subs = new SubSink();

  constructor( private readonly formBuilder: FormBuilder,
               private readonly usuarioService: UsuarioService,
               private readonly empregadoService: EmpregadoService,
               private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.createForm();

    this.filterFormUsuario = this.formBuilder.group({
      nomeFilterCtrl: ['']
    });

    this.usuarioService.getAllUsuario().subscribe((usuario: Usuarios[]) => {
      this.usuarioList = (!!usuario) ? usuario : [];
      this.dataSource.data = [...this.usuarioList];

      this.empregadoService.getAllEmpregado().subscribe((empregado: Empregado[]) => {
        this.empregadoAutocomplete = (!!empregado) ? empregado : [];


        fromEvent(this.empregadoAuto.nativeElement, 'keyup').pipe(
          map((event: any) => {
            return event.target.value;
          })
          , debounceTime(1000)
        ).subscribe((text: string) => {
          if (text) {
            this._filterEmpregado(text);
          }

      });

    });

  });


  }

  displayFn(empregado: Empregado): string {
    return empregado ? empregado.nomeEmpregado : undefined;
  }


  private _filterEmpregado(paramOfFilter: string): void {
    if (!!paramOfFilter) {
      this.empregadoList = this.empregadoAutocomplete.filter
        (x =>
          x.nomeEmpregado.toUpperCase().includes(paramOfFilter.toUpperCase())
        );
    }
  }

  resetFiltered(): void {
    if (!this.idEmpregado) {

      if (this.formsRegister.get('idEmpregado').value !==  this.idEmpregado.idEmpregado) {

        this.formsRegister.controls['idEmpregado'].setValue(null);
      }
    }
  }


  private createForm(): void {
    this.formsRegister = new FormGroup({

        idUser: new FormControl(null),
        tipo: new FormControl('', Validators.required),
        userName: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required),
        flagAtivo: new FormControl(false),
        status: new FormControl(''),
        idEmpregado: new FormControl('', Validators.required)
     });
  }


  private addIdEmpregado(id: any): void {
    this.idEmpregado = id;

}


  salvarUsuario(): void {
    const usuario: Usuarios = {
      idUser: this.formsRegister.get('idUser').value,
      tipo: this.formsRegister.get('tipo').value,
      userName: this.formsRegister.get('userName').value,
      senha: this.formsRegister.get('senha').value,
      status: this.formsRegister.get('flagAtivo').value ? 'I' : 'A',
      idEmpregado: this.idEmpregado


    };
    if (this.formsRegister.value.idUser) {

        this.usuarioService.editUsuario(usuario).subscribe(() => {
          this.usuarioService.getAllUsuario().subscribe(usuarios => {
            this.usuarioList = (!!usuarios) ? usuarios : [];
            this.dataSource.data = [...this.usuarioList];
            this.toastr.success('Usuário editado com sucesso!', 'Editar');
            this.limpar();
          });
        });
    } else {
      this.subs.sink =  this.usuarioService.saveUsuario(usuario).subscribe(() => {
          this.usuarioService.getAllUsuario().subscribe(usuarios => {
            this.usuarioList = (!!usuarios) ? usuarios : [];
            this.dataSource.data = [...this.usuarioList];
            this.toastr.success('Usuário salvo com sucesso!', 'Salvar');
            this.limpar();
          });
        });
    }
  }

  private limpar(): void {
    this.formsRegister.reset();
    this.toastr.info('Campos limpos com sucesso!');
  }


  excluirUsuario(idUser: string): void {

    this.usuarioService.deleteUsuario(idUser).subscribe(() => {
      this.usuarioService.getAllUsuario().subscribe(usuarios => {
       this.usuarioList = usuarios;
       this.dataSource.data = this.usuarioList;
       this.filterFormUsuario.reset();
       this.toastr.success('Usuário excluído com sucesso!', 'Excluir');
      });
     });
  }


  getRowTableUsuario(value: any): void {
    let nome;
    let id;
    this.empregadoAutocomplete.find(x => {
      if (x.idEmpregado === value.idEmpregado) {
        id = x.idEmpregado;
        nome = x.nomeEmpregado;
      }
     });
    this.idEmpregado = id;
    this.formsRegister.get('idUser').setValue(value.idUser);
    this.formsRegister.get('tipo').setValue(value.tipo);
    this.formsRegister.get('userName').setValue(value.userName);
    this.formsRegister.get('senha').setValue(value.senha);
    this.formsRegister.get('flagAtivo').setValue(value.status === 'A' ? false : true );
    this.formsRegister.get('idEmpregado').setValue(nome);

  }



  filterTabelaUsuario(): void {
    let filteredTable: Usuarios[] = this.usuarioList;
    if (!this.filterFormUsuario.value.nomeFilterCtrl) {
      this.dataSource.data = [...this.usuarioList];
    }
    if (this.filterFormUsuario.value.nomeFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x => {
        return x.userName ? x.userName.toUpperCase().includes(this.filterFormUsuario.value.nomeFilterCtrl.toUpperCase()) : null;
      });
     }
    this.dataSource.data = filteredTable;
  }

}
