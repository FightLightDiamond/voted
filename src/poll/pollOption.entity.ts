import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { PollEntity } from './poll.entity';

@ObjectType()
@Entity('poll_options')
export class PollOptionEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  text: string;

  @Field()
  @Column('integer')
  votes: number;

  @Field()
  @Column()
  pollId: number;

  @ManyToOne(() => PollEntity, (poll) => poll.pollOption, {
    onDelete: 'CASCADE',
  })
  poll: Promise<PollEntity>; // generated a  pollId
}
