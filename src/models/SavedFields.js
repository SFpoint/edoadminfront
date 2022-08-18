import { DocFieldsType } from "./docFieldType";

export class Field {
  constructor() {
    this.keyName = null;
    this.label = null;
    this.minLength = null;
    this.maxLength = null;
    this.number = null;
    this.regular = null;
    this.required = null;
    this.dictionaryField = null;
    this.docFieldsType = null;
  }

  static buildFromAPI(obj) {
    const _this = new Field();

    if (obj) {
      _this.keyName = obj.keyName || null;
      _this.label = obj.label || null;
      _this.minLength = obj.minLength || null;
      _this.maxLength = obj.maxLength || null;
      _this.number = obj.number || null;
      _this.regular = obj.regular || null;
      _this.required = obj.required || null;
      _this.dictionaryField = obj.dictionaryField || null;
      _this.docFieldsType =
        (obj.docFieldsType && DocFieldsType.buildFromAPI(obj.docFieldsType)) ||
        null;
    }
    return _this;
  }
}
