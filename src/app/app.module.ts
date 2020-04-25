import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyProjectsTableComponent } from './my-projects-table/my-projects-table.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProvidersTableComponent } from './providers-table/providers-table.component';
import { MaterialsTableComponent } from './materials-table/materials-table.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginService } from './services/login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectMaterialsComponent } from './project-materials/project-materials.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { AddZoneDialogComponent } from './add-zone-dialog/add-zone-dialog.component';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { MyProjectsService } from './services/my-projects.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddMaterialDialogComponent } from './add-material-dialog/add-material-dialog.component';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';
import { httpInterceptProviders } from './http-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    MyProjectsTableComponent,
    LoginComponent,
    MainComponent,
    ProvidersTableComponent,
    MaterialsTableComponent,
    ClientsTableComponent,
    MyProfileComponent,
    ProjectMaterialsComponent,
    AddZoneDialogComponent,
    AddProjectDialogComponent,
    AddMaterialDialogComponent,
    AddClientDialogComponent
  ], entryComponents: [AddZoneDialogComponent, AddProjectDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTreeModule,
    MatExpansionModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [LoginService, MyProjectsService, httpInterceptProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
