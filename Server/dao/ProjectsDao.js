import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export class ProjectsDao {
  constructor() {
    this.file = resolve("./data/projects.json");
    this.projects = [];
  }

  readFile() {
    const file = readFileSync(this.file, { encoding: "utf-8" });
    this.projects = JSON.parse(file);
  }

  writeFile() {
    writeFileSync(this.file, JSON.stringify(this.projects));
  }

  getAll() {
    return this.projects;
  }

  save(project) {
    project.id = Date.now();
    this.projects.push(project);
    this.writeFile();
    return project;
  }

  findById(id) {
    return this.projects.find((p) => p.id === id);
  }

  deleteProject(id) {
    this.projects = this.projects.filter((p) => p.id !== id);
    this.writeFile();
  }

  updateProject(projectUpdate) {
    const project = this.findById(projectUpdate.id);
    if (project == undefined) {
      return false;
    }
    project.title = projectUpdate.title;
    project.description = projectUpdate.description;
    project.startDate = projectUpdate.startDate;
    project.endDate= projectUpdate.endDate;
    project.status = projectUpdate.status

    this.writeFile();
    return true;
  }

  updateStatut(id) {
    const project = this.findById(id);
    if (project == undefined) {
      return false;
    }
    project.status = !project.status;
    this.writeFile();

    return true;
  }

  searchByStatus(status) {
    return this.projects.filter(project => project.status === status);
  }
}