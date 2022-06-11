import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsePipes } from '@nestjs/common';
import * as yup from 'yup';
import { YupValidationPipe } from '../_common/pipes/YupValidation.pipe';
import { SignupInput } from './input/signup.input';
import { UserService } from './user.service';
import { ErrorResponse } from './shared/errorResponse';
import { LoginInput } from './input/login.input';

const signupInputSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).max(150).required(),
});

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return 'Hello world';
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  @UsePipes(new YupValidationPipe(signupInputSchema))
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.signup(signupInput);
  }

  @Mutation(() => [ErrorResponse] || String, { nullable: true })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<ErrorResponse[] | string> {
    try {
      return await this.userService.login(loginInput);
    } catch (e) {
      return 'error';
    }
  }

  // @Mutation(() => Boolean)
  // async logout(@Context() ctx: MyContext) {
  //   await ctx.req.session.destroy((err) => {
  //     console.log(err)
  //   })
  //
  //   // ctx.res.clearCookie('votinapp')
  //   return true
  // }
}
