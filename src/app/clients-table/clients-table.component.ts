import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ClientsTableDataSource, ClientsTableItem } from './clients-table-datasource';
import { MatDialog } from '@angular/material/dialog';
import { NewClientDialogData } from '../DataTypes/data.types';
import { AddClientDialogComponent } from '../add-client-dialog/add-client-dialog.component';

@Component({
  selector: 'clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ClientsTableItem>;
  dataSource: ClientsTableDataSource;
  data: ClientsTableItem[] = [];
  newClientDialogData: NewClientDialogData;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['clientName', 'clientEmail', 'clientPhoneNr'];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new ClientsTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.initDialogData();
  }

  openDialogToAddClient() {
    let dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '50%',
      data: this.newClientDialogData
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if (result != false) {
          this.addClientToList(result);
          this.initDialogData();
        }
      });
  }

  addClientToList(client) {
    this.data.push(client);
    this.dataSource = new ClientsTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  initDialogData() {
    this.newClientDialogData = {
      clientName: "",
      clientEmail: "",
      clientPhoneNr: ""
    }
  }
}
