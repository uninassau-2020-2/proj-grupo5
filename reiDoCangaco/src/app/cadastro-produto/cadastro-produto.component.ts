import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../models/produto.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ProdutoService } from './produto.service';
import { FornecedorPjService } from '../cadastro-fornecedor/service/fornecedorPj.service';
import { FornecedorPfService } from '../cadastro-fornecedor/service/fornecedorPf.service';
import { FornecedorPj } from '../models/fornecedorPj.model';
import { FornecedorPf } from '../models/fornecedorPf.model';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {

  produtos: Produto[];
  produtoList: Produto[] = [];
  fornecedorPJList: FornecedorPj [] = [];
  fornecedoresPj: FornecedorPj [];
  fornecedoresPf: FornecedorPf [];
  fornecedorPfList: FornecedorPf [] = [];
  showFornecedor = false;
  formsRegister: FormGroup;
  filterFormProduto: FormGroup;
  displayedColumns: string[] = ['idProduto', 'descProduto', 'preco', 'tipoVolume', 'action'];
  dataSource = new MatTableDataSource<Produto>();
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly produtoService: ProdutoService,
              private readonly fornecedorPjService: FornecedorPjService,
              private readonly fornecedorPfService: FornecedorPfService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.listarFornecedorPJ();
    this.listarFornecedorPF();
    this.listarProduto();
    this.filterFormProduto = this.formBuilder.group({
      descricaoFilterCtrl: ['']
    });
    this.dataSource.paginator = this.MatPaginator;
  }

  private listarProduto(): void {
    this.produtoService.getAllProduto().subscribe((produto: Produto[]) => {
      this.produtoList = (!!produto) ? produto : [];
      this.dataSource.data = [...this.produtoList];
    });
  }


  private listarFornecedorPJ(): void {
    this.fornecedorPjService.getAllFornecedorPj().subscribe((fornecedorPj: FornecedorPj[]) => {
      this.fornecedorPJList = (!!fornecedorPj) ? fornecedorPj : [];
      this.fornecedoresPj = [...this.fornecedorPJList];
    });
  }

  private listarFornecedorPF(): void {
    this.fornecedorPfService.getAllFornecedorPf().subscribe((fornecedorPf: FornecedorPf[]) => {
      this.fornecedorPfList = (!!fornecedorPf) ? fornecedorPf : [];
      this.fornecedoresPf = [...this.fornecedorPfList];
    });
  }


  private createForm(): void {
    this.formsRegister = new FormGroup({
      idProduto: new FormControl(''),
      descProduto: new FormControl(''),
      preco: new FormControl(''),
      tipoVolume: new FormControl(''),
      tipoFornecedor: new FormControl(''),
      idFornecedorPJ: new FormControl(''),
      idFornecedorPF: new FormControl(''),
      flagAtivo: new FormControl(false),
      status: new FormControl('')
    });
  }


salvarProduto() {
  const produto: Produto = {
    idProduto: this.formsRegister.value.idProduto,
    descProduto: this.formsRegister.get('descProduto').value,
    preco: this.formsRegister.get('preco').value,
    tipoVolume: this.formsRegister.get('tipoVolume').value,
    idFornecedorPJ: this.formsRegister.get('tipoFornecedor').value === 'fornecedorPJ' ?
     this.formsRegister.get('idFornecedorPJ').value : '',
    idFornecedorPF: this.formsRegister.get('tipoFornecedor').value === 'fornecedorPF' ?
    this.formsRegister.get('idFornecedorPF').value : '',
    status: this.formsRegister.get('flagAtivo').value ? 'I' : 'A',

  };
  if (!!this.formsRegister.value.idProduto) {
    this.produtoService.editProduto(produto).subscribe(() => {
      this.produtoService.getAllProduto().subscribe(produtos => {
        this.produtoList = produtos;
        this.dataSource.data = this.produtoList;
        this.formsRegister.reset();
        this.toastr.success('Produto atualizado com sucesso!', 'Alterar');
       });
    });

  } else {
      this.produtoService.saveProduto(produto).subscribe(() => {
       this.produtoService.getAllProduto().subscribe(produtos => {
        this.produtoList = produtos;
        this.dataSource.data = this.produtoList;
        this.formsRegister.reset();
        this.toastr.success('Produto cadastrado com sucesso!', 'Salvar');
       });
      });
    }
}

excluirProduto(id: string): void {
  this.produtoService.deleteProduto(id).subscribe(() => {
    this.produtoService.getAllProduto().subscribe(produtos => {
     this.produtoList = produtos;
     this.dataSource.data = this.produtoList;
     this.formsRegister.reset();
     this.toastr.success('Produto excluído com sucesso!', 'Excluir');
    });
   });
}

limpar() {
  this.formsRegister.reset();
  this.toastr.info('Campos limpos!', 'Limpar');
}


getRowTableProduto(value: any): void {
  this.formsRegister.get('idProduto').setValue(value.idProduto);
  this.formsRegister.get('descProduto').setValue(value.descProduto);
  this.formsRegister.get('preco').setValue(value.preco);
  this.formsRegister.get('tipoVolume').setValue(value.tipoVolume);
  this.formsRegister.get('fornecedorPj').setValue(value.fornecedorPj);
  this.formsRegister.get('fornecedorPf').setValue(value.fornecedorPf);


}




filterTabelaProduto(): void {
  let filteredTable: Produto[] = this.produtoList;
  if (!this.filterFormProduto.value.descricaoFilterCtrl) {
    this.dataSource.data = [...this.produtoList];
  }
  if (this.filterFormProduto.value.descricaoFilterCtrl) {
    filteredTable = filteredTable.filter
    ( x => {
      return x.descProduto ? x.descProduto.toUpperCase().includes(this.filterFormProduto.value.descricaoFilterCtrl.toUpperCase()) : null;
    });
   }
  this.dataSource.data = filteredTable;
}




}
