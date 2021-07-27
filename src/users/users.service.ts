import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInputError } from 'apollo-server-express';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { Token } from './models/token.model';
import { Users, UsersDocument } from './schemas/users.schema';
require('dotenv').config();
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const BCRYPT_SALT = process.env.BCRYPT_SALT;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginInput): Promise<Token> {
    const user = await this.usersModel.findOne({
      username: loginData.username,
    });
    if (!user) {
      throw new UserInputError('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UserInputError('wrong password');
    }

    const payload = { username: user.username, sub: user.id };

    const token = this.jwtService.sign(payload);

    return { value: token };
  }

  async createUser(createUserInput: CreateUserInput): Promise<Users> {
    const hash = await bcrypt.hash(createUserInput.password, BCRYPT_SALT);
    const NewUser = new this.usersModel({
      ...createUserInput,
      password: hash,
    });
    try {
      await NewUser.save();
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: createUserInput,
      });
    }
    return NewUser;
  }
}
