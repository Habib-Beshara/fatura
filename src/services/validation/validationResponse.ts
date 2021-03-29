export default class ValidationResponse {
  private success = true
  private errors = []

  getErrors () {
    return this.errors
  }

  addErrors (errors: any[]) {
    this.errors.push(...errors)
    this.success = false
  }

  toJson () {
    return {
      success: this.success,
      errors: [...this.errors],
    }
  }
}
