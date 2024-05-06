class User {
  id: number
  name: string
  password: string
  email: string
  type: string
  constructor (id:number, name: string, password: string, email: string, type: string) {
    this.id = id
    this.name = name
    this.password = password
    this.email = email
    this.type = type
  }
}

module.exports = { User }
