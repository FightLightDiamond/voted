import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import debug from 'debug';
import { MathService } from './math/math.service';
import { ThrottlerBehindProxyGuard } from './_common/ThrottlerBehindProxyGuard';

// const {
//   Worker,
//   isMainThread,
//   parentPort,
//   workerData,
// } = require('node:worker_threads');

@UseGuards(ThrottlerBehindProxyGuard)
@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly mathService: MathService) {}

  // Define the message pattern for the method
  @MessagePattern('add')
  accumulate(data: number[]): number {
    this.logger.log('Adding ' + data.toString());
    return this.mathService.accumulate(data);
  }

  // Define the message pattern for the method
  @MessagePattern('livepublisher')
  a(data) {
    console.log({ data });
  }

  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
  }

  @MessagePattern('time.us.*')
  getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"
    return new Date().toLocaleTimeString();
  }

  @Throttle(1, 10)
  @Get('/')
  async home() {
    const v8 = require('v8');
    let totalHeapSize = v8.getHeapStatistics().total_available_size;
    totalHeapSize = totalHeapSize / 1024 / 1024 / 1024;
    console.log(`Total heap size: ${totalHeapSize} GB`);

    const TEST_NAMESPACE = 'authentication';
    const testing = debug(TEST_NAMESPACE);
    if (process.env.NODE_ENV == 'testing') {
      debug.enable(TEST_NAMESPACE);
    }
    testing('BeginTest');
    const data1 = await this.test1();
    testing('End Step 1', data1);
    const data2 = await this.test2();
    testing('End Step 2', data2);

    let totalHeapSize2 = v8.getHeapStatistics().total_available_size;
    totalHeapSize2 = totalHeapSize / 1024 / 1024 / 1024;
    console.log(`Total heap size: ${totalHeapSize2} GB`);
    // console.log(`End: ${totalHeapSize2 - totalHeapSize} GB`);
    return 'home';
  }

  async test1() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('foo');
      }, 300);
    });
  }

  async test2() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('boo');
      }, 300);
    });
  }

  @Throttle(3, 60)
  @Get('/throttle')
  throttle() {
    console.log(`throttle`);
  }

  @Get('/inheritance')
  Inheritance() {
    const newTeslaEmployee = new TeslaEmployee('123456');
    newTeslaEmployee.setName({ name: 'Kevin Odongo', age: 36 });
    newTeslaEmployee.addDepartment({ name: 'Finance' });
    newTeslaEmployee.addEmployee({ name: 'Kevin Odongo', age: 36 });
    console.log(newTeslaEmployee);
  }
}

type Department = {
  name: string;
  a?: string;
};

type Employee = {
  name: string;
  age: number;
  a?: string;
};

abstract class TeslaCompany {
  private static role = 'Admin';
  private readonly credentials: string = '';
  private departments: Department[] = [];
  private employees: Employee[] = [];

  protected a = 'a';

  constructor(cred: string) {
    this.credentials = cred;
  }

  addDepartment(value: Department) {
    this.departments = [...this.departments, { ...value, a: this.a }];
  }

  addEmployee(value: Employee) {
    this.employees = [...this.employees, { ...value, a: this.a }];
  }
}

class TeslaEmployee extends TeslaCompany {
  private new_employee: Employee = { name: '', age: 0 };
  protected a = 'b';
  public setName(name: Employee): void {
    this.new_employee = name;
  }
}
