export default interface IRepository {
  findById (id: number): Promise<any>

  insert (input: any): Promise<number>
}
