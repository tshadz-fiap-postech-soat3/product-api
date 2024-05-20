export class CategoryEntity {
  id: string;
  name: string;
  createdAtDate: Date;
  updatedAtDate: Date;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.createdAtDate = new Date();
    this.updatedAtDate = new Date();
  }
}
