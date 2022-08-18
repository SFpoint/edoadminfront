import { DocFieldsType } from "./docFieldType";

export class DocFields {
  constructor() {
    this.keyName = null;
    this.number = null;
    this.docFieldsType = null;
    this.id = null;
    this.dictionaryField = null;
    this.docDescription = null;
  }

  static buildFromAPI(obj) {
    const _this = new DocFields();
    if (obj) {
      _this.keyName = obj.keyName || null;
      _this.number = obj.number || null;
      _this.id = obj.id || null;
      _this.docDescription = obj.docDescription || null;
      _this.dictionaryField = obj.dictionaryField || null;
      _this.docFieldsType =
        (obj.docFieldsType && DocFieldsType.buildFromAPI(obj.docFieldsType)) ||
        null;
    }
    return _this;
  }
}
