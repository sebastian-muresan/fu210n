import { Injectable } from '@angular/core';
import { MyProjectsTableItem } from '../DataTypes/data.types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyProjectsService {
  myProjects: MyProjectsTableItem[];
  projectMaterials: MyProjectsTableItem[];
  private apiUrl = 'https://proview-api.herokuapp.com';
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.apiUrl + '/getMyProjects').pipe(map(projects => {
      return projects;
    }));
  }

  getProjectMaterials(projectId) {
    return this.http.post(this.apiUrl + '/getProjectMaterials', { projectId: projectId }).pipe(map(materials => {
      return materials;
    }));
  }

  addProject(project) {
    return this.http.post(this.apiUrl + '/addProject', project).pipe(map(project => {
      return project;
    }));
  }

  /*getProjectMaterials(projectId) {
    this.myProjects = [{ idProject: 1, projectName: 'Hexagon', projectDescription: 'Proiect Cluj-Napoca' }]
    return this.myProjects;
  }*/
}
