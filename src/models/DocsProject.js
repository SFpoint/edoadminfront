export class DocsProjects {
  constructor() {
    this.list = [];
  }

  addDocsProject(obj) {
    !this.checkDocsProjectInList(obj) &&
      this.list.push(DocsProject.buildFromAPI(obj));
  }

  updateDocsProject(obj) {
    const index = this.list.findIndex((el) => el.projectId === obj.project.id);
    this.list.splice(index, 1, DocsProject.buildFromAPI(obj));
  }

  removeDocsProject(projectId) {
    const index = this.list.findIndex((el) => el.projectId === project.id);
    this.list.splice(index, 1);
  }

  checkDocsProjectInList(obj) {
    return this.list.some((el) => el.projectId === obj.project.id);
  }
}

export class DocsProject {
  constructor() {
    this.projectId = null;
    this.projectCreatedDate = null;
    this.projectName = null;
    this.projectModifiedDate = null;
  }
  static buildFromAPI(obj) {
    const _this = new DocsProject();

    if (obj) {
      _this.projectId = obj.id;
      _this.projectCreatedDate = obj.createdDate;
      _this.projectName = obj.name;
      _this.projectModifiedDate = obj.modifiedDate;
    }

    return _this;
  }
}
