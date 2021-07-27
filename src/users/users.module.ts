import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
