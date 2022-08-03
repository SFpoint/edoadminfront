class Password {
	constructor() {
		this.value = null
		this.visible = false
		this.icon = 'mdi-eye'
		this.type = 'password'
	}

	changeVisible() {
		this.visible = !this.visible
		this.icon = this.visible ? 'mdi-eye-off' : 'mdi-eye'
		this.type = this.visible ? 'text' : 'password'
	}
}

export class Login {
	constructor() {
		this.login = null
		this.password = new Password()
	}
}

export class Registration {
	constructor() {
		this.login = null
		this.password = new Password()
		this.passwordConfirm = new Password()
		this.code = null
	}
}