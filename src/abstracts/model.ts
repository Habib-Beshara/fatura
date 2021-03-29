import ajv from '../services/validation/ajv'
import ValidationResponse from '../services/validation/validationResponse'

export default abstract class Model {
  protected schema
  private response: ValidationResponse

  constructor () {
    this.response = new ValidationResponse()
  }

  validate (input: any) {
    const validate = ajv.compile(this.schema)
    const valid = validate(input)
    if (!valid)
      this.response.addErrors(validate.errors)
    return this.response.toJson()
  }
}
