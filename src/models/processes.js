export class Processes {
  constructor() {
    this.list = []
  }

  addProcess(obj) {
    !this.checkProcessInList(obj) && this.list.push(Process.buildFromAPI(obj))
  }

  updateProcess(obj) {
    const index = this.list.findIndex(el => el.processId === obj.processId)
    this.list.splice(index, 1, Process.buildFromAPI(obj))
  }

  removeProcess(processId) {
    const index = this.list.findIndex(el => el.processId === processId)
    this.list.splice(index, 1)
  }

  checkProcessInList(obj) {
    return this.list.some(el => el.processId === obj.processId)
  }
}


export class Process {
  constructor() {
    this.processId = null
    this.processName = null
    this.processDescription = null
    this.processCommand = null
    this.prevTimeActive = null

    this.nextTimeActive = null
    this.daysPeriod = 0
    this.hoursPeriod = 0
    this.minutesPeriod = 0
    this.secondsPeriod = 0

    // отображение блока планировщик в модалке процесса
    this.isScheduler = false
    // дата и время в модалке процесса
    this.schedulerDate = null
    this.schedulerTime = null
    // текст статуса с датой для таблицы
    this.textStatus = null
  }

  removeScheduler() {
    this.nextTimeActive = null
    this.daysPeriod = 0
    this.hoursPeriod = 0
    this.minutesPeriod = 0
    this.secondsPeriod = 0

    this.isScheduler = false
    this.schedulerDate = null
    this.schedulerTime = null
  }

  isAnyPeriod() {
    return this.isScheduler
      ? !!+this.daysPeriod || !!+this.hoursPeriod || !!+this.minutesPeriod || !!+this.secondsPeriod
      : true
  }

  joinDateAndTime() {
    const date = new Date(this.schedulerDate)

    if (date.getMonth) {
      const formatSchedulerDate = new Date(this.schedulerDate).toLocaleString().replace(/\./g,'-').split(',')[0]
      const formatSchedulerTime = `${this.schedulerTime}:00`

      return [formatSchedulerDate, formatSchedulerTime].join(' ')
    }
  }

  splitDateAndTime() {
    const splitDate = this.nextTimeActive.split(' ')

    if (splitDate.length === 2) {
      this.schedulerDate = new Date(splitDate[0])
      this.schedulerTime = splitDate[1].slice(0, -3)
    }
  }

  setTextStatus() {

  }

  getForApi() {
    return {
      processId: this.processId,
      processName: this.processName,
      processDescription: this.processDescription,
      processCommand: this.processCommand,

      nextTimeActive: this.joinDateAndTime() || null,
      daysPeriod: this.daysPeriod,
      hoursPeriod: this.hoursPeriod,
      minutesPeriod: this.minutesPeriod,
      secondsPeriod: this.secondsPeriod
    }
  }

  static buildFromAPI(obj) {
    const _this = new Process()

    if (obj) {
      _this.processId = obj.processId
      _this.processName = obj.processName
      _this.processDescription = obj.processDescription
      _this.processCommand = obj.processCommand
      _this.prevTimeActive = obj.prevTimeActive
      _this.status = obj.status

      _this.nextTimeActive = obj.nextTimeActive
      _this.daysPeriod = obj.daysPeriod || 0
      _this.hoursPeriod = obj.hoursPeriod || 0
      _this.minutesPeriod = obj.minutesPeriod || 0
      _this.secondsPeriod = obj.secondsPeriod || 0

      _this.textStatus = obj.textStatus
      _this.isScheduler = !!_this.nextTimeActive
      _this.isScheduler && _this.splitDateAndTime()
    }

    return _this
  }
}