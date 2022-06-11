/**
 * https://www.npmjs.com/package/@faker-js/faker
 */
import { faker } from '@faker-js/faker';
import { OnModuleInit } from '@nestjs/common';
// import { Broker } from './broker';
import { IUser } from './interface/IUser';

/**
 * Producer
 */
export class Producer implements OnModuleInit {
  createRandomUser(): IUser {
    return {
      id: faker.datatype.uuid(),
      username: faker.internet.userName(),
      role: faker.random.numeric(1),
    };
  }

  onModuleInit(): any {
    // console.log('Producer onModuleInit');
    // setInterval(() => {
    //   const user: IUser = this.createRandomUser();
    //   Broker.pushMessage(user.id, user);
    // }, 1000);
  }
}
