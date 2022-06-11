import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.findOne({
      where: { email: email },
    });
  }
}
