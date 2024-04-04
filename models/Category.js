class Category {
  constructor (id, name) {
    this.categoryId = parseInt(id)
    this.categoryName = name
    this.products = []
  }
}

module.exports = { Category }
