import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInputError } from 'apollo-server-express';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { Token } from './models/token.model';
import { Users, UsersDocument } from './schemas/users.schema';
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_SALT = process.env.BCRYPT_SALT;
const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async login(loginData: LoginInput): Promise<Token> {
    const user = await this.usersModel.findOne({
      username: loginData.username,
    });

    if (!user) {
      throw new UserInputError('User not found');
    }
    const isPasswordCorrect = bcrypt.compareSync(
      loginData.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UserInputError('wrong password');
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    return { value: jwt.sign(userForToken, JWT_SECRET) };
  }

  async createUser(createUserInput: CreateUserInput): Promise<Users> {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(createUserInput.password, salt);
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
