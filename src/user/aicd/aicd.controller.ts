import { Controller, Get } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserRepository } from '../user.repository';
import { UserEntity } from '../user.entity';

@Controller('aicd')
export class AicdController {
  constructor(readonly userRepository: UserRepository) {}

  @Get('/un-atomicity')
  async atomicityError() {
    const finallyFee = 1;
    await this.userRepository.update(
      { id: 1 },
      {
        balance: () => `balance + ${finallyFee}`,
      },
    );

    await this.userRepository.update(
      { id: 1 },
      {
        available_balance: () => `available_balances + ${finallyFee}`,
      },
    );
  }

  @Get('/atomicity')
  async atomicity() {
    const finallyFee = 1;
    await getConnection().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(
        UserEntity,
        { id: 1 },
        {
          balance: () => `balance + ${finallyFee}`,
        },
      );
      await transactionalEntityManager.update(
        UserEntity,
        { id: 1 },
        {
          available_balance: () => `available_balance + ${finallyFee}`,
        },
      );
    });
  }

  /**
   * READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE
   */
  @Get('/no-read-uncommitted')
  async readUncommitted() {
    const finallyFee = 1;
    const user = await this.userRepository.findOne({
      where: {
        id: 1,
      },
      select: ['id', 'balance', 'available_balance'],
    });

    await this.userRepository.update(
      { id: 1 },
      {
        balance: () => `balance + ${finallyFee}`,
        available_balance: () => `available_balance + ${finallyFee}`,
      },
    );

    const sum = await this.userRepository
      .createQueryBuilder('u')
      .select([
        'u.id',
        'u.balance',
        'u.available_balance',
        '(u.balance + u.available_balance) as total',
      ])
      .where({
        id: 1,
      })
      .getRawOne();

    return {
      user,
      sum,
    };
  }

  @Get('/read-uncommitted')
  async unReadUncommitted() {
    const finallyFee = 1;

    const res = await getConnection().transaction(
      async (transactionalEntityManager) => {
        const user1 = await transactionalEntityManager
          .createQueryBuilder(UserEntity, 'u')
          .select([
            'u.id',
            'u.balance',
            'u.available_balance',
            '(u.balance + u.available_balance) as total',
          ])
          .where({
            id: 1,
          })
          .getRawOne();

        await this.userRepository.update(
          { id: 1 },
          {
            balance: () => `balance + ${finallyFee}`,
            available_balance: () => `available_balance + ${finallyFee}`,
          },
        );

        const user2 = await transactionalEntityManager
          .createQueryBuilder(UserEntity, 'u')
          .select([
            'u.id',
            'u.balance',
            'u.available_balance',
            '(u.balance + u.available_balance) as total',
          ])
          .where({
            id: 1,
          })
          .getRawOne();

        return { user1, user2 };
      },
    );

    return {
      res,
    };
  }

  @Get('/read-committed')
  async ReadCommitted() {
    await getConnection().transaction(async (transactionalEntityManager) => {
      const user = await transactionalEntityManager
        .createQueryBuilder(UserEntity, 'ub')
        .setLock('pessimistic_write')
        .where('ub.id = :id', {
          id: 1,
        })
        .getOneOrFail();
      transactionalEntityManager.createQueryBuilder().select('SLEEP(30)');
      await transactionalEntityManager.save(user);
    });
    await getConnection().transaction(async (transactionalEntityManager) => {
      const user = await transactionalEntityManager
        .createQueryBuilder(UserEntity, 'ub')
        .setLock('pessimistic_write')
        .where('ub.id = :id', {
          id: 1,
        })
        .getOneOrFail();
      user.balance = user.balance - 1;
      await transactionalEntityManager.save(user);
    });
  }

  @Get('/un-read-committed')
  async unReadCommitted() {
    const finallyFee = 1;
    await this.userRepository.update(
      { id: 1 },
      {
        balance: () => `balance + ${finallyFee}`,
        available_balance: () => `available_balance - ${finallyFee}`,
      },
    );
  }

  @Get('/repeatable-read')
  async repeatableRead() {
    const finallyFee = 1;
    await this.userRepository.update(
      { id: 1 },
      {
        balance: () => `balance + ${finallyFee}`,
        available_balance: () => `available_balance - ${finallyFee}`,
      },
    );
  }

  @Get('/un-repeatable-read')
  async UnRepeatableRead() {
    const finallyFee = 1;
    await this.userRepository.update(
      { id: 1 },
      {
        balance: () => `balance + ${finallyFee}`,
        available_balance: () => `available_balance - ${finallyFee}`,
      },
    );
  }

  @Get('/serializable')
  async serializable() {
    const finallyFee = 1;
    await this.userRepository.update(
      { id: 1 },
      {
        balance: () => `balance + ${finallyFee}`,
        available_balance: () => `available_balance - ${finallyFee}`,
      },
    );
  }

  @Get('/un-serializable')
  async UnSerializable() {
    const finallyFee = 1;
    await this.userRepository.update(
      { id: 1 },
      {
        balance: () => `balance + ${finallyFee}`,
        available_balance: () => `available_balance - ${finallyFee}`,
      },
    );
  }

  @Get('/pessimistic_write')
  async test() {
    await getConnection().transaction(async (transactionalEntityManager) => {
      const u = await transactionalEntityManager
        .createQueryBuilder(UserEntity, 'ub')
        .setLock('pessimistic_write')
        .where('ub.id = :id', {
          id: 1,
        })
        .getOneOrFail();
      u.balance = 1000;

      await this.userRepository.update({ id: 1 }, { balance: 0 });
      await this.userRepository.update({ id: 1 }, { available_balance: 100 });

      await transactionalEntityManager.save(u);
    });
  }

  @Get('/sleep')
  // @Transaction()
  async tests() {
    await getConnection().transaction(async () => {
      await getConnection().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager
          .createQueryBuilder()
          .select('SLEEP(30)')
          .getOne();
      });
    });
  }
}
