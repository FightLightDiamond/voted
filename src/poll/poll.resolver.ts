import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Connection } from 'typeorm';
import { GqlAuthGuard } from '../auth/guards/gqlAuth.guard';
import { PollService } from './poll.service';
import { GetUserIdDecorator } from './getUserId.decorator';
import { CreatePollArgs } from './args/createPoll.args';
import { MyContextTypes } from './types/myContext.types';
import { PollEntity } from './poll.entity';
import { AllPollsArgs } from './args/AllPollsArgs';
import { PollOptionEntity } from './pollOption.entity';

@Resolver(() => PollEntity)
export class PollResolver {
  constructor(
    private readonly pollService: PollService,
    private connection: Connection,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async createPoll(
    @Args() { name, options }: CreatePollArgs,
    @GetUserIdDecorator() userId: string,
  ): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.pollService.createPoll(userId, name, options);
      return true;
    } catch (e) {
      console.log('Exception');
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  @Mutation(() => Boolean)
  async vote(
    @Context() ctx: MyContextTypes,
    @Args('pollOptionId') pollOptionId: number,
  ): Promise<boolean> {
    return this.pollService.vote(ctx, pollOptionId);
  }

  @Query(() => PollEntity)
  async poll(@Args('id') id: number): Promise<PollEntity> {
    return this.pollService.poll(id);
  }

  @Query(() => [PollEntity])
  async allPolls(@Args() { take, skip }: AllPollsArgs): Promise<PollEntity[]> {
    return this.pollService.allPolls(take, skip);
  }

  @Mutation(() => Boolean)
  async deletePoll(
    @Context() ctx: MyContextTypes,
    @Args('id') id: number,
  ): Promise<boolean> {
    return this.pollService.deletePoll(ctx, id);
  }

  @Query(() => [PollEntity])
  @UseGuards(GqlAuthGuard)
  async myPoll(@GetUserIdDecorator() userId: string): Promise<PollEntity[]> {
    return this.pollService.myPoll(userId);
  }

  @ResolveField('pollOption')
  async pollOption(
    @Root() poll: PollEntity,
    @Context() ctx: MyContextTypes,
  ): Promise<PollOptionEntity[]> {
    return ctx.pollOptionLoader.load(poll.id);
  }
}
