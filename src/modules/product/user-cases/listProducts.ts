export default class ListProducts {

  constructor (private productRepository: any) {
  }

  exec (categoryId: number, limit: number = 25, offset: number = 0) {
    return this.productRepository.findProductsByCategory(categoryId , limit, offset)
  }
}
