import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { MyProjectsTableComponent } from './my-projects-table/my-projects-table.component';
import { MaterialsTableComponent } from './materials-table/materials-table.component';
import { ProvidersTableComponent } from './providers-table/providers-table.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AdminGuard } from './admin/admin.guard';
import { ProjectMaterialsComponent } from './project-materials/project-materials.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'my-projects', component: MyProjectsTableComponent, canActivate: [AdminGuard], data: { animation: 'isLeft' } },
  { path: 'menu', component: MainComponent, canActivate: [AdminGuard] },
  { path: 'materials', component: MaterialsTableComponent, canActivate: [AdminGuard] },
  { path: 'providers', component: ProvidersTableComponent, canActivate: [AdminGuard] },
  { path: 'clients', component: ClientsTableComponent, canActivate: [AdminGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AdminGuard] },
  { path: 'projectMaterials/:id', component: ProjectMaterialsComponent, canActivate: [AdminGuard], data: { animation: 'isRight' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
