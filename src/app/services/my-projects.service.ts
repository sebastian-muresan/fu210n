import { Injectable } from '@angular/core';
import { MyProjectsTableItem } from '../DataTypes/data.types';

@Injectable({
  providedIn: 'root'
})
export class MyProjectsService {
  myProjects: MyProjectsTableItem[];

  constructor() { }

  getProjects() {
    this.myProjects = [{ idProject: 1, projectName: 'Hexagon', projectDescription: 'Proiect Cluj-Napoca' }]
    return this.myProjects;
  }
}
