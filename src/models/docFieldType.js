export class DocFieldsType {
  constructor() {
    this.docFieldsTypeId = null;
    this.docFieldsTypeName = null;
  }
  static buildFromAPI(obj) {
    const _this = new DocFieldsType();

    if (obj) {
      _this.docFieldsTypeId = obj.id;
      _this.docFieldsTypeName = obj.name;
    }
    return _this;
  }
}
