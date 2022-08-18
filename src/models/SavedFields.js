export class field {
  constructor() {
    this.label = null;
    this.minLength = null;
    this.maxLength = null;
    this.number = null;
    this.regular = null;
    this.required = null;
    this.dictionaryFiled = null;
  }

  static buildFromAPI(obj) {
    const _this = new DocType();

    if (obj) {
      _this.label = obj.label || null;
      _this.minLength = obj.minLength || null;
      _this.maxLength = obj.maxLength || null;
      _this.number = obj.number || null;
      _this.regular = obj.regular || null;
      _this.required = obj.required || null;
      _this.dictionaryFiled = obj.dictionaryFiled || null;
    }
    return _this;
  }
}
