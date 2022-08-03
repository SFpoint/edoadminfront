
export class Logs {
  constructor() {
    this.list = []
  }

  addLog(obj) {
    this.list.push(Log.buildFromAPI(obj))
  }

  clearLogs() {
    this.list = []
  }
}


export class Log {
  constructor() {
    this.logId = null
    this.processName = null
    this.logDescription = null
    this.time = null
  }

  static buildFromAPI(obj) {
    const _this = new Log()

    if (obj) {
      _this.logId = obj.logId
      _this.processName = obj.processName
      _this.logDescription = obj.data?.log
      _this.time = obj.time
    }

    return _this
  }
}