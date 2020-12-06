import { CadastroEmpregadoComponent } from './cadastro-empregado/cadastro-empregado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CadastroFornecedorComponent } from './cadastro-fornecedor/cadastro-fornecedor.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroPedidosComponent } from './cadastro-pedidos/cadastro-pedidos.component';
import { VendasComponent } from './vendas/vendas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

{
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
},

{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
},

{
    path: 'login',
    component: LoginComponent
},

{
  path: 'usuario',
  component: CadastroUsuarioComponent
},
{
  path: 'produto',
  component: CadastroProdutoComponent,
  canActivate: [AuthGuard]
},
{
  path: 'pedido',
  component: CadastroPedidosComponent,
  canActivate: [AuthGuard]
},
{
  path: 'empregado',
  component: CadastroEmpregadoComponent,
  canActivate: [AuthGuard]
},
{
  path: 'fornecedor',
  component: CadastroFornecedorComponent,
  canActivate: [AuthGuard]
},
{
  path: 'vendas',
  component: VendasComponent,
  canActivate: [AuthGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
