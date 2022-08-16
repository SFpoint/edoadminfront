export class DocsProjects {
  constructor() {
    this.list = [];
  }

  addDocsProject(obj) {
    !this.checkDocsProjectInList(obj) &&
      this.list.push(DocsProject.buildFromAPI(obj));
  }

  updateDocsProject(obj) {
    const index = this.list.findIndex((el) => el.projectId === obj.projectId);
    this.list.splice(index, 1, DocsProject.buildFromAPI(obj));
  }

  removeDocsProject(projectId) {
    const index = this.list.findIndex((el) => el.projectId === projectId);
    this.list.splice(index, 1);
  }

  checkDocsProjectInList(obj) {
    return this.list.some((el) => el.projectId === obj.projectId);
  }
}

export class DocsProject {
  constructor() {
    this.project.id = null;
    this.project.createdDate = null;
    this.project.name = null;
    this.project.modifiedDate = null;
  }
  static buildFromAPI(obj) {
    const _this = new DocsProject();

    if (obj) {
      _this.project.id = obj.id;
      _this.project.createdDate = obj.createdDate;
      _this.project.name = obj.name;
      _this.project.modifiedDate = obj.modifiedDate;
    }

    return _this;
  }
}
