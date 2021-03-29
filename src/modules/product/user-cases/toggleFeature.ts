export default class ToggleFeature {

  constructor (private productRepository: any) {}

  exec (productId: number) {
    return this.productRepository.toggleFeature(productId)
  }
}
