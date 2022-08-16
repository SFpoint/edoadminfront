export class DocTypes {
  constructor() {
    this.list = [];
  }

  addDocType(obj) {
    !this.checkDocTypeInList(obj) && this.list.push(DocType.buildFromAPI(obj));
  }

  updateDocType(obj) {
    const index = this.list.findIndex((el) => el.id === obj.id);
    this.list.splice(index, 1, DocType.buildFromAPI(obj));
  }

  removeDocType(id) {
    const index = this.list.findIndex((el) => el.id === id);
    this.list.splice(index, 1);
  }

  checkDocTypeInList(obj) {
    return this.list.some((el) => el.id === obj.id);
  }
}

export class DocType {
  constructor() {
    this.id = null;
    this.name = null;
    this.nameEng = null;
  }
  static buildFromAPI(obj) {
    const _this = new DocType();

    if (obj) {
      _this.id = obj.id;
      _this.name = obj.name;
      _this.nameEng = obj.nameEng;
    }

    return _this;
  }
}
