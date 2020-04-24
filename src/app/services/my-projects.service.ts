import { Injectable } from '@angular/core';
import { MyProjectsTableItem } from '../DataTypes/data.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyProjectsService {
  myProjects: MyProjectsTableItem[];
  projectMaterials: MyProjectsTableItem[];

  constructor(private http: HttpClient) { }

  getProjects() {

    this.myProjects = [{ idProject: 1, projectName: 'Hexagon', projectDescription: 'Proiect Cluj-Napoca' }]
    return this.myProjects;
  }

  getProjectMaterials(projectId) {
    this.myProjects = [{ idProject: 1, projectName: 'Hexagon', projectDescription: 'Proiect Cluj-Napoca' }]
    return this.myProjects;
  }
}
