class Category {
  categoryId: number
  categoryName: any
  products: any[]
  constructor (id:any, name:string) {
    this.categoryId = parseInt(id)
    this.categoryName = name
    this.products = []
  }
}

module.exports =  {Category }
