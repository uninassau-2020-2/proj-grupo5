import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatDialogModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthService } from './guards/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroPedidosComponent } from './cadastro-pedidos/cadastro-pedidos.component';
import { CadastroFornecedorComponent } from './cadastro-fornecedor/cadastro-fornecedor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroEmpregadoComponent } from './cadastro-empregado/cadastro-empregado.component';
import { ModalAlertaComponent } from './shared/component/modals/modal-alerta/modal-alerta.component';
import { NgxMaskModule } from 'ngx-mask';
import { ModalFinalizarVendaComponent } from './shared/component/modals/modalFinalizarVenda/modalFinalizarVenda.component';
import { VendasComponent } from './vendas/vendas.component';
import { ModalDetalhesVendaComponent } from './shared/component/modals/modalDetalhesVenda/modalDetalhesVenda.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroProdutoComponent,
    CadastroPedidosComponent,
    CadastroUsuarioComponent,
    CadastroFornecedorComponent,
    DashboardComponent,
    CadastroEmpregadoComponent,
    ModalAlertaComponent,
    ModalFinalizarVendaComponent,
    VendasComponent,
    ModalDetalhesVendaComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDatepickerModule,
    MatToolbarModule,
    ToastrModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    MatGridListModule,
    LayoutModule,
    SharedModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatListModule

  ],
  providers: [AuthGuard, AuthService, MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, ],
    entryComponents: [ModalAlertaComponent, ModalFinalizarVendaComponent, ModalDetalhesVendaComponent],
    //exports: [NgxMaskModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
