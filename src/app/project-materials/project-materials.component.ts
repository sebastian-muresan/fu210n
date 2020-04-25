import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectMaterialsDataSource } from './project-materials-datasource';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AddZoneDialogComponent } from '../add-zone-dialog/add-zone-dialog.component';
import { TableUtil } from '../utils/tableUtils';
import { PdfUtil } from '../utils/tableUtils';
import { ProjectMaterialsItem, NewMaterialDialogData } from '../DataTypes/data.types';
import { AddMaterialDialogComponent } from '../add-material-dialog/add-material-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyProjectsService } from '../services/my-projects.service';
import { first } from 'rxjs/operators';
import { MaterialsTableComponent } from '../materials-table/materials-table.component';
@Component({
  selector: 'app-project-materials',
  templateUrl: './project-materials.component.html',
  styleUrls: ['./project-materials.component.css']
})

export class ProjectMaterialsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProjectMaterialsItem>;

  dataSource: ProjectMaterialsDataSource;
  data: ProjectMaterialsItem[] = [];
  newZoneName;
  newMaterial: NewMaterialDialogData;
  displayedColumnsMaterial;
  selectedFile;
  zones = [];

  constructor(private _route: ActivatedRoute, private _router: Router, private _dialog: MatDialog, private _snackBar: MatSnackBar, private _projectsService: MyProjectsService) { }

  ngOnInit() {
    this._route.params.subscribe((value) => {
      console.log(value.id);
      this.loadData(value.id);
    });
    this.displayedColumnsMaterial = this.getDisplayColumns();
    this.initNewMaterial();
  }

  loadData(projectId) {
    this.data = [];
    let materials;

    this._projectsService.getProjectMaterials(projectId).pipe(first()).subscribe(data => {
      materials = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < materials.length; i++) {
        let material = materials[i];
        if (this.searchZone(material.idZone) == false) {
          this.data.push(this.getZoneLine(material.zoneName, material.idZone));
          this.zones.push(material.idZone);
        }
        if (material.idMaterial != null) {
          this.data.push({
            id: material.idMaterial,
            manufacturer: material.materialManufacturer,
            name: material.materialName,
            code: material.materialCode,
            description: material.materialDescription,
            place: material.materialApplication,
            link: material.materialLink,
            image: material.materialImage,
            quantity: material.materialQuantity,
            uom: material.materialUom,
            price: material.materialPricePerUom,
            total_price: material.materialPricePerUom * material.materialQuantity,
            zoneId: material.materialZoneId,
            isZone: false,
            isTotal: false
          });
        }
      }
      this.data.push(this.getTotalLine());
      this.dataSource = new ProjectMaterialsDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });

  }
  searchZone(zone) {
    for (let i = 0; i < this.zones.length; i++) {
      if (zone[i] == zone) {
        return true;
      }
    }
    return false;
  }
  ngAfterViewInit() {
  }

  back() {
    this._router.navigate(['my-projects']);
  }

  addZone() {
    let dialogRef = this._dialog.open(AddZoneDialogComponent, {
      width: '250px',
      data: { newZoneName: this.newZoneName }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result != false) {
          console.log(result);
          this.data.splice(this.data.length - 1, 0, this.getZoneLine(result, this.getMaxZoneId() + 1));
          this.dataSource = new ProjectMaterialsDataSource(this.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
          this._snackBar.open('Zona adaugata cu succes !', null, { duration: 2000 });
        }
      }
    );
  }
  addMaterialToZone(zoneId, zoneName) {

    this.newMaterial.materialZoneName = zoneName;
    let dialogRef = this._dialog.open(AddMaterialDialogComponent, {
      width: '50%',
      data: this.newMaterial
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result != false) {
          let lastIndex = 0;
          let indexFound = false;
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].zoneId == zoneId && indexFound == false) {
              indexFound = true;
            }
            if (indexFound == true && this.data[i].zoneId != zoneId) {
              lastIndex = i;
              break;
            }
          }
          this.data.splice(lastIndex, 0,
            {
              id: this.getMaxId() + 1,
              manufacturer: result.materialManufacturer,
              name: result.materialName,
              code: result.materialCode,
              description: result.materialDescription,
              place: result.materialPlace,
              link: result.materialLink,
              image: result.materialImage,
              quantity: result.materialQuantity,
              uom: result.materialUom,
              price: result.materialPricePerUom,
              total_price: result.materialPricePerUom * result.materialQuantity,
              zoneId: zoneId,
              isTotal: false,
              isZone: false
            }
          );
          this.dataSource = new ProjectMaterialsDataSource(this.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
          this.initNewMaterial();
          this._snackBar.open('Material adaugat cu succes !', null, { duration: 2000 });
        }
      });
  }
  readProjectMaterials() {

  }

  getMaxZoneId() {
    let maxZoneId = 0;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].zoneId > maxZoneId) {
        maxZoneId = this.data[i].zoneId;
      }
    }
    return maxZoneId;
  }

  getMaxId() {
    let maxId = 0;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id > maxId) {
        maxId = this.data[i].id;
      }
    }
    return maxId;
  }

  getZoneLine(zoneName, zoneId): ProjectMaterialsItem {
    return {
      id: 0,
      manufacturer: '',
      name: zoneName,
      code: '',
      description: '',
      place: '',
      link: '',
      image: '',
      quantity: '',
      uom: '',
      price: 0,
      total_price: 0,
      zoneId: zoneId,
      isTotal: false,
      isZone: true
    };
  }
  getTotalLine() {
    return {
      id: 0,
      manufacturer: '',
      name: 'Total',
      code: '',
      description: '',
      place: '',
      link: '',
      image: '',
      quantity: '',
      uom: '',
      price: 0,
      total_price: 0,
      zoneId: 0,
      isTotal: true,
      isZone: false
    }
  }

  initNewMaterial() {
    this.newMaterial = {
      materialName: '',
      materialCode: '',
      materialDescription: '',
      materialImage: '',
      materialLink: '',
      materialManufacturer: '',
      materialQuantity: 0,
      materialUom: '',
      materialPricePerUom: 0,
      materialPlace: '',
      materialZoneId: 0,
      materialZoneName: ''
    }
  }

  getDisplayColumns() {
    return ['id', 'name', 'manufacturer', 'code', 'description', 'place', 'link', 'image', 'quantity', 'uom', 'price', 'total_price'];
  }
  exportTable() {
    TableUtil.exportToExcel("materialsTable");
  }

  exportPDF() {
    PdfUtil.exportToPDF(this.data, 'test.pdf');
  }

  openFile() {
    document.querySelector('input').click()
  }
  handle(e) {
    console.log('Change input file')
  }

}
