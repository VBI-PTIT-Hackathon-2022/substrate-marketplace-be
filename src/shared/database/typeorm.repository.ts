import { BaseEntity, DeepPartial, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export class TypeOrmRepository<T extends BaseEntity> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }
  save(data: any): Promise<T> {
    return this.repository.save(data);
  }

  update(
    id: string | number | string[] | Date | number[] | Date[],
    data: any,
  ): Promise<any> {
    return this.repository.update(id, data);
  }

  async createMany(data: any[]): Promise<T[]> {
    return await this.repository.save(data);
  }

  async findById(id: EntityId, options?: any): Promise<T> {
    return await this.repository.findOne(options || {});
  }
  async findOne(condition: any): Promise<T> {
    return await this.repository.findOneBy(condition);
  }
  async findByCondition(conditions: any): Promise<T[]> {
    return await this.repository.find(conditions);
  }

  async findByIdAndUpdate(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findOneAndUpdate(conditions: any, data: any): Promise<T[]> {
    await this.repository.update(conditions, data);
    return this.findByCondition(conditions);
  }

  public async softDelete(conditions: any) {
    return await this.repository.softDelete(conditions);
  }
  public async delete(conditions: any) {
    return await this.repository.delete(conditions);
  }

  public async findAndCount(conditions: any): Promise<[T[], number]> {
    return await this.repository.findAndCount(conditions);
  }

  public async count(conditions: any) {
    return await this.repository.count(conditions);
  }

  public async findOneByCondition(conditions: any) {
    return await this.repository.findOne(conditions);
  }

  public async findAll() {
    return await this.repository.find();
  }
}
