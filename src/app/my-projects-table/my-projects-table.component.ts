import { AfterViewInit, Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MyProjectsTableDataSource } from './my-projects-table-datasource';
import { MyProjectsTableItem } from '../DataTypes/data.types';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';
import { NewProjectDialogData } from '../DataTypes/data.types';
import { MyProjectsService } from '../services/my-projects.service';

@Component({
  selector: 'my-projects-table',
  templateUrl: './my-projects-table.component.html',
  styleUrls: ['./my-projects-table.component.css']
})

export class MyProjectsTableComponent implements AfterViewInit, OnInit {

  @Input() parentApi: MainComponent

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MyProjectsTableItem>;
  data: MyProjectsTableItem[] = [];
  dataSource: MyProjectsTableDataSource;
  newProjectDialogData: NewProjectDialogData;
  displayedColumns;

  constructor(private router: Router, private dialog: MatDialog, private myProjectService: MyProjectsService) { }

  ngOnInit() {
    this.data = this.myProjectService.getProjects();
    if (this.data.length != 0) {
      this.dataSource = new MyProjectsTableDataSource(this.data);
    }
    this.initDialogData();
    this.displayedColumns = this.getColumnsToDisplay();

  }

  ngAfterViewInit() {
    if (this.data.length != 0) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }
  displayProjectMaterials(idProject) {
    this.router.navigate(['/projectMaterials', idProject]);
  }

  openDialogToAddProject() {
    let dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '50%',
      data: this.newProjectDialogData
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if (result != false) {
          this.addProjectToList(result);
          this.initDialogData();
        }
      });
  }

  getColumnsToDisplay() {
    return ['projectName', 'projectDescription', 'actions'];
  }

  getNextIdProiect() {
    return 0;
  }

  addProjectToList(result) {
    this.data.push({
      idProject: this.getNextIdProiect(),
      projectName: result.projectName,
      projectDescription: result.projectDescription
    });
    this.dataSource = new MyProjectsTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join(' / ');
  }

  initDialogData() {
    this.newProjectDialogData = {
      projectDescription: "",
      projectName: ""
    }
  }

}
